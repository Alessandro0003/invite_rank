import { z } from 'zod'

export const subscriberRankingPositionSchema = z.object({
  subscriberId: z.string().uuid(),
})

export const subscriberRankingPositionResponse = z.object({
  position: z.number().nullable(),
})
