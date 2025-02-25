import * as Repository from '../../repository/subscriber-invites-count'
import type { GetCount } from './types'

export const getCount = async (args: GetCount.Args) => {
  const { subscriberId } = args

  return await Repository.getCount({ subscriberId })
}
