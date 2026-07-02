'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

const ASSETS = {
  bg:      '/assets/66fba518-20f1-4dd9-b489-80742557ee27.png',
  avatar1: '/assets/a0491844-ffd2-4329-a9e4-c9f816810a32.png',
  avatar2: '/assets/dcea8734-4985-481e-9f1f-aadcc84098d1.png',
  avatar3: '/assets/aa3e5f15-4cd5-4e8e-abcf-d05b8d878e88.png',
}

const TESTIMONIALS = [
  {
    name: 'Karthik Raj',
    role: 'Cultural Fest Head, SRM University',
    quote:
      '"We didn\'t expect the merchandise to feel this premium. FabLabs turned simple T-shirts into stylish essentials that we now wear every day. Great value for money."',
    avatar: ASSETS.avatar3,
    bg: '#BC0A69',
  },
  {
    name: 'Shri Guru',
    role: 'Cultural Fest Head, SRM University',
    quote:
      '"FabLabs made our college fest T-shirts look amazing! Everyone in our batch loved the design—it truly captured the vibe. The quality was excellent, and the delivery was right on time."',
    avatar: ASSETS.avatar1,
    bg: '#ffffff',
    featured: true,
  },
  {
    name: 'Ananya',
    role: 'Cultural Fest Head, SRM University',
    quote:
      '"We wanted hoodies for our startup team, and FabLabs delivered perfectly. From stitching to printing, everything was clean and professional. Now, in every meeting, people ask us, \'Where did you get these from?\'"',
    avatar: ASSETS.avatar2,
    bg: '#B9BC0A',
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative w-full overflow-hidden min-h-[500px]">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={ASSETS.bg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 py-16 px-4 sm:px-8 lg:px-12">
        <h2
          className="text-white text-4xl sm:text-5xl font-bold text-center mb-12"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          Clients Testimonial
        </h2>

        <div className="max-w-360 mx-auto">
          <Carousel opts={{ align: 'start', loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t) => (
                <CarouselItem
                  key={t.name}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <Card
                    className={cn(
                      'rounded-[32px] border-0 shadow-lg h-full ring-0',
                      t.featured && 'lg:shadow-2xl'
                    )}
                    style={{ background: t.bg }}
                  >
                    <CardContent className="p-7 flex flex-col h-full gap-4">
                      {/* Author */}
                      <div className="flex items-start gap-4">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="size-16 rounded-full object-cover shrink-0"
                        />
                        <div>
                          <p
                            className="font-bold text-black text-sm leading-tight"
                            style={{ fontFamily: 'var(--font-k2d)' }}
                          >
                            {t.name}
                          </p>
                          <p
                            className="text-black/80 text-xs leading-snug mt-0.5"
                            style={{ fontFamily: 'var(--font-k2d)' }}
                          >
                            {t.role}
                          </p>
                          <div className="flex mt-1">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <span key={s} className="text-amber-500 text-xs">★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Quote */}
                      <p
                        className="italic text-black text-xs sm:text-sm leading-relaxed flex-1"
                        style={{ fontFamily: 'var(--font-k2d)' }}
                      >
                        {t.quote}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <div className="flex justify-center gap-3 mt-8">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-transparent border-[#0A64BC] text-[#0A64BC] hover:bg-[#0A64BC]/10 hover:text-[#0A64BC]" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-transparent border-[#0A64BC] text-[#0A64BC] hover:bg-[#0A64BC]/10 hover:text-[#0A64BC]" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
