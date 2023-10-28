export interface Players {
  players: PlayerData[]
  page: number,
  perPage: number,
  pageSize: number
}

export interface PlayerData {
  _id: string
  slug: string
  tag: string
  name?: string
  country?: string
  accounts?: Account[]
  relevant?: boolean
}

export interface Account {
  platform: string
  id: string
}
