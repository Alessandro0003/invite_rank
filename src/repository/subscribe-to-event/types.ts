export namespace SubscribeToEvent {
  export type Args = {
    name: string
    email: string
    referrerId?: string | null
  }

  export type Response = {
    subscriberId: string
  }
}
