import * as Repository from '../../repository/subscriber-invite-clics'
import type { Get } from './types'

export const get = async (args: Get.Args) => {
  const { subscriberId } = args

  return await Repository.get({ subscriberId })
}
