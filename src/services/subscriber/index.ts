import * as Repository from '../../repository/subscriber'
import type { SubscribeToEvent } from './types'

export const subscribeToEvent = async (args: SubscribeToEvent.Args) => {
  const { name, email, referrerId } = args

  return await Repository.subscribeToEvent({ name, email, referrerId })
}
