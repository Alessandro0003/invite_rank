import * as Repository from '../../repository/get-subscriber-ranking-position'
import type { GetSubscriberRankingPosition } from './types'

export const getSubscriberRankingPosition = async (
  args: GetSubscriberRankingPosition.Args
) => {
  const { subscriberId } = args

  return await Repository.getSubscriberRankingPosition({ subscriberId })
}
