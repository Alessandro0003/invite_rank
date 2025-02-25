import { z } from 'zod'

export const subscribeInviteCountSchema = z.object({
  subscriberId: z.string().uuid(),
})

export const subscribeInviteCountResponse = z.object({
  count: z.number(),
})
