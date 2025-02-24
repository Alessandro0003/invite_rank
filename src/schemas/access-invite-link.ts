import { z } from 'zod'

export const accessInviteLinkParams = z.object({
  subscriberId: z.string().uuid(),
})

export const accessInviteLinkResponse = z.null()
