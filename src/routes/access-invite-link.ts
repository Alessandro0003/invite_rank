import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { env } from '../env'
import { redis } from '../redis/client'
import {
  accessInviteLinkParams,
  accessInviteLinkResponse,
} from '../schemas/access-invite-link'
import * as Service from '../services/access-invite-link'

export const accessInviteLinkrRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access invite link and redirects user',
        tags: ['referral'],
        params: accessInviteLinkParams,
        response: {
          302: accessInviteLinkResponse,
        },
      },
    },

    async (request, reply) => {
      const { subscriberId } = request.params

      await Service.accessInviteLink({ subscriberId })

      console.log(await redis.hgetall('referral:access-count'))

      const redirectUrl = new URL(env.WEB_URL)
      redirectUrl.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
