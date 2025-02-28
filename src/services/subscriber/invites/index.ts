import * as Repository from '../../../repository/subscriber/invites'
import type { AccessInviteLink, GetClics, GetCount } from './types'

export const accessInviteLink = async (args: AccessInviteLink.Args) => {
  const { subscriberId } = args

  return await Repository.accessInivteLink({ subscriberId })
}

export const getClics = async (args: GetClics.Args) => {
  const { subscriberId } = args

  return await Repository.get({ subscriberId })
}

export const getCount = async (args: GetCount.Args) => {
  const { subscriberId } = args

  return await Repository.getCount({ subscriberId })
}
