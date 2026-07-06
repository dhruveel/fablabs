import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import zlib from 'zlib'
import { MongoClient } from 'mongodb'

function loadEnvFile(filename) {
  const filePath = path.resolve(process.cwd(), filename)
  if (!fs.existsSync(filePath)) return

  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eq = trimmed.indexOf('=')
    if (eq === -1) continue

    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (!(key in process.env)) process.env[key] = value
  }
}

loadEnvFile('.env.local')
loadEnvFile('.env')

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('Missing MONGODB_URI (set it in .env.local or the environment)')
  process.exit(1)
}

// ── Minimal PNG encoder (no image libs installed in this project) ──────────
const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    table[n] = c >>> 0
  }
  return table
})()

function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  }
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii')
  const lenBuf = Buffer.alloc(4)
  lenBuf.writeUInt32BE(data.length, 0)
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf])
}

// pixelFn(x, y) -> [r, g, b]
function encodePng(width, height, pixelFn) {
  const raw = Buffer.alloc((width * 3 + 1) * height)
  let offset = 0
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0 // no per-scanline filter
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixelFn(x, y)
      raw[offset++] = r
      raw[offset++] = g
      raw[offset++] = b
    }
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 2 // color type: truecolor (RGB)
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const idat = zlib.deflateSync(raw)
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t)
}

// Simple diagonal-gradient "mockup" images — not AI art, just distinguishable
// placeholder reference images (this project has no image-gen tool wired up).
function mockupImage({ width, height, from, to, label }) {
  const png = encodePng(width, height, (x, y) => {
    const t = (x / width + y / height) / 2
    const r = lerp(from[0], to[0], t)
    const g = lerp(from[1], to[1], t)
    const b = lerp(from[2], to[2], t)

    // A simple centered stripe pattern so the two images are visually distinct
    // beyond just color, mimicking a printed-shirt design placeholder.
    const stripe = Math.floor((x + y) / 24) % 2 === 0
    if (stripe && x > width * 0.2 && x < width * 0.8 && y > height * 0.35 && y < height * 0.65) {
      return [255, 255, 255]
    }

    return [r, g, b]
  })
  return { png, label }
}

const images = [
  mockupImage({
    width: 480,
    height: 480,
    from: [10, 100, 188], // #0A64BC
    to: [10, 20, 40],
    label: 'polo-design-reference.png',
  }),
  mockupImage({
    width: 480,
    height: 480,
    from: [188, 10, 105], // #BC0A69
    to: [30, 10, 20],
    label: 'hoodie-crest-reference.png',
  }),
]

const uploadsDir =
  process.env.QUOTE_UPLOADS_DIR || path.join(process.cwd(), 'uploads', 'quote-images')
fs.mkdirSync(uploadsDir, { recursive: true })

const now = Date.now()
const hour = 60 * 60 * 1000

const quoteDocs = images.map(({ png, label }, i) => {
  const filename = `${crypto.randomUUID()}.png`
  fs.writeFileSync(path.join(uploadsDir, filename), png)

  return {
    name: i === 0 ? 'Priya Nair' : 'Rahul Menon',
    phone: i === 0 ? '9876543210' : '9123456780',
    email: i === 0 ? 'priya.nair@example.com' : null,
    requirements:
      i === 0
        ? 'Need 25 polo T-shirts printed with this design for our department send-off.'
        : 'Looking for a quote on 15 hoodies with this crest embroidered on the front.',
    image: { filename, originalName: label, contentType: 'image/png' },
    status: null,
    createdAt: new Date(now - (i + 1) * hour),
    ip: `203.0.113.${140 + i}`,
  }
})

const client = new MongoClient(uri)

try {
  await client.connect()
  const db = client.db(process.env.MONGODB_DB || undefined)
  const result = await db.collection('quotes').insertMany(quoteDocs)
  console.log(`Inserted ${result.insertedCount} quote requests with generated reference images.`)
} finally {
  await client.close()
}
