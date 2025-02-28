import { redis } from '../../../redis/client'
import type { AccessInviteLink, Get, GetCount } from './types'

/* 
No redis existe, estruturas de dados mais comum é
  -> chave/valor
  -> lists [] =  comandos que começa com a letra L
  -> hashes {} = comandos que começa com a letra H
  -> sorted sets [] arrays ordenados por colunas = comandos que começa com a letra Z
*/

export async function accessInivteLink(args: AccessInviteLink.Args) {
  const { subscriberId } = args
  await redis.hincrby('referral:access-count', subscriberId, 1)
}

export async function get(args: Get.Args) {
  const { subscriberId } = args

  const countClics = await redis.hget('referral:access-count', subscriberId)
  const count = countClics ? Number.parseInt(countClics) : 0

  return { count }
}

export async function getCount(args: GetCount.Args) {
  const { subscriberId } = args
  const countInvites = await redis.zscore('referral:ranking', subscriberId)
  const count = countInvites ? Number.parseInt(countInvites) : 0

  return { count }
}
