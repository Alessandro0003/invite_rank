import { redis } from '../../redis/client'
import type { Get } from './types'

export async function get(args: Get.Args) {
  const { subscriberId } = args

  const countClics = await redis.hget('referral:access-count', subscriberId)
  const count = countClics ? Number.parseInt(countClics) : 0

  return { count }
}
