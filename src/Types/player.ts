export interface Players {
  players: Player[]
}

export interface Player {
  _id: string
  slug: string
  tag: string
  name: string
  country: string
  accounts: Account[]
  relevant: boolean
}

export interface Account {
  platform: string
  id: string
}
