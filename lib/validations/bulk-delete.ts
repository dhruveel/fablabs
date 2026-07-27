import { z } from 'zod'

export const BulkDeleteSchema = z.object({
  ids: z.array(z.string()).min(1),
})
