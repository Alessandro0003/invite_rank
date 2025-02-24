import * as Repository from '../../repository/access-invite-link'
import type { AccessInviteLink } from './types'

export const accessInviteLink = async (args: AccessInviteLink.Args) => {
  const { subscriberId } = args

  return await Repository.accessInivteLink({ subscriberId })
}
