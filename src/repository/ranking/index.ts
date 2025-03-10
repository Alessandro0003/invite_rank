import { prisma as pg } from '../../prisma/client'
import { redis } from '../../redis/client'
import type { GetSubscriberRankingPosition } from './types'

export async function getRanking() {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')
  const subscriberIdAndScore: Record<string, number> = {}

  for (let i = 0; i < ranking.length; i += 2) {
    subscriberIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
  }

  const subscriberIds = Object.keys(subscriberIdAndScore)

  const subscribers = await pg.subscriptions.findMany({
    where: {
      id: {
        in: subscriberIds,
      },
    },
  })

  const rankingWithScore = subscribers
    .map(subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscriberIdAndScore[subscriber.id],
      }
    })
    .sort((sub1, sub2) => {
      return sub2.score - sub1.score
    })

  return { rankingWithScore }
}

export async function getSubscriberRankingPosition(
  args: GetSubscriberRankingPosition.Args
) {
  const { subscriberId } = args
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
}
