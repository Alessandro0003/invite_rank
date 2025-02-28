import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import {
  subscribeInviteCountResponse,
  subscribeInviteCountSchema,
} from '../schemas/subscribe-invite-count'
import * as Services from '../services/subscriber/invites'

export const getSubscribeInviteCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Get subscriber invites count',
          tags: ['referral'],
          params: subscribeInviteCountSchema,
          response: {
            200: subscribeInviteCountResponse,
          },
        },
      },
      async request => {
        const { subscriberId } = request.params
        const { count } = await Services.getCount({ subscriberId })

        return { count }
      }
    )
  }
