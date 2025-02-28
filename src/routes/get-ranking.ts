import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { rankingResponse } from '../schemas/ranking'
import * as Service from '../services/ranking'

export const getRanking: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get subscriber to ranking position',
        tags: ['referral'],
        response: {
          200: rankingResponse,
        },
      },
    },
    async request => {
      const { rankingWithScore } = await Service.getRanking()

      return { ranking: rankingWithScore }
    }
  )
}
