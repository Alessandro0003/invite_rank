import { redis } from '../../redis/client'
import type { GetSubscriberRankingPosition } from './types'

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
