import { z } from 'zod'
import { LEAD_STATUSES } from '@/lib/constants/lead-status'

export const UpdateLeadStatusSchema = z.object({
  status: z.enum(LEAD_STATUSES).nullable(),
})
