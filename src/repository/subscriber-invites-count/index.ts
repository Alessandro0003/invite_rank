import { redis } from '../../redis/client'
import type { GetCount } from './types'

export async function getCount(args: GetCount.Args) {
  const { subscriberId } = args
  const countInvites = await redis.zscore('referral:ranking', subscriberId)
  const count = countInvites ? Number.parseInt(countInvites) : 0

  return { count }
}
