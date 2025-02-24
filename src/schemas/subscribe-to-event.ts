import { z } from 'zod'

export const subscribeToEventSchema = z.object({
  name: z.string(),
  email: z.string(),
  referrer: z.string().nullish(),
})

export const subscribeToEventResponseSchema = z.object({
  subscriberId: z.string().uuid(),
})
