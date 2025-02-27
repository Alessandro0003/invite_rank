import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import {
  subscriberRankingPositionResponse,
  subscriberRankingPositionSchema,
} from '../schemas/subsccriber-ranking-position'
import * as Service from '../services/get-subscriber-ranking-position'

export const getSubscriberRankinPosition: FastifyPluginAsyncZod = async app => {
  app.get(
    '/subscribers/:subscriberId/ranking/position',
    {
      schema: {
        summary: 'Get subscriber to ranking position',
        tags: ['referral'],
        params: subscriberRankingPositionSchema,
        response: {
          200: subscriberRankingPositionResponse,
        },
      },
    },
    async request => {
      const { subscriberId } = request.params
      const { position } = await Service.getSubscriberRankingPosition({
        subscriberId,
      })

      return { position }
    }
  )
}
