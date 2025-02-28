import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import {
  subscribeToEventResponseSchema,
  subscribeToEventSchema,
} from '../schemas/subscribe-to-event'
import * as Service from '../services/subscriber'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe to an event',
        tags: ['Subscriptions'],
        body: subscribeToEventSchema,
        response: {
          201: subscribeToEventResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { name, email, referrer } = request.body

      const { subscriberId } = await Service.subscribeToEvent({
        name,
        email,
        referrerId: referrer,
      })

      return reply.status(201).send({
        subscriberId,
      })
    }
  )
}
