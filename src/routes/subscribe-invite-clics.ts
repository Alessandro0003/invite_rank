import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import {
  SubscriberInviteClicsResponse,
  SubscriberInviteClicsSchema,
} from '../schemas/subscribe-invite-clics'
import * as Service from '../services/subscriber-invite-clics'

export const getSubscribeInviteClicsRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/clicks',
      {
        schema: {
          sumary: 'Get subscriber invite clicks count',
          tags: ['referral'],
          params: SubscriberInviteClicsSchema,
          response: {
            200: SubscriberInviteClicsResponse,
          },
        },
      },
      async request => {
        const { subscriberId } = request.params
        const { count } = await Service.get({ subscriberId })

        return { count }
      }
    )
  }
