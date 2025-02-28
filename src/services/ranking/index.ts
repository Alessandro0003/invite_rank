import * as Repository from '../../repository/ranking'
import type { GetSubscriberRankingPosition } from './types'

export const getRanking = async () => {
  return await Repository.getRanking()
}

export const getSubscriberRankingPosition = async (
  args: GetSubscriberRankingPosition.Args
) => {
  const { subscriberId } = args

  return await Repository.getSubscriberRankingPosition({ subscriberId })
}
