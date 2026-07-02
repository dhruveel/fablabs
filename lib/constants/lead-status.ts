export const LEAD_STATUSES = ['talking', 'ordered', 'completed', 'cold'] as const

export type LeadStatus = (typeof LEAD_STATUSES)[number]

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  talking: 'Talking',
  ordered: 'Ordered',
  completed: 'Completed',
  cold: 'Cold',
}
