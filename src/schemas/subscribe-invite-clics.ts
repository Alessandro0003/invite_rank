import { z } from 'zod'

export const SubscriberInviteClicsSchema = z.object({
  subscriberId: z.string().uuid(),
})

export const SubscriberInviteClicsResponse = z.object({
  count: z.number(),
})
