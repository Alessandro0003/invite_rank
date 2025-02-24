import { prisma } from '../../prisma/client'
import { redis } from '../../redis/client'
import type { SubscribeToEvent } from './types'

export async function subscribeToEvent(
  args: SubscribeToEvent.Args
): Promise<SubscribeToEvent.Response> {
  const { name, email, referrerId } = args

  const subscribers = await prisma.subscriptions.findMany({
    where: {
      email,
    },
  })

  if (subscribers.length > 0) {
    // isso não faz criar um novo usuario, mas sim estou reaproveitando o mesmo id
    return { subscriberId: subscribers[0].id }
  }

  const result = await prisma.subscriptions.create({
    select: {
      id: true,
    },
    data: {
      name,
      email,
    },
  })

  if (referrerId) {
    await redis.zincrby('referral:ranking', 1, referrerId)
  }

  const subscriberId = result.id

  return {
    subscriberId,
  }
}
