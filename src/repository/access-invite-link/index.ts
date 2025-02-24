import { redis } from '../../redis/client'
import type { AccessInviteLink } from './types'

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
