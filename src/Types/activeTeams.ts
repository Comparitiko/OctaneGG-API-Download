export interface ActiveTeams {
  teams: TeamElements[]
}

export interface TeamElements {
  team: PlayerTeam
  players: Player[]
}

export interface Player {
  _id: string
  slug: string
  tag: string
  name?: string
  country: string
  team: PlayerTeam
  accounts?: Account[]
  relevant?: boolean
  substitute?: boolean
  coach?: boolean
}

export interface Account {
  platform: Platform
  id: string
}

export enum Platform {
  Epic = 'epic',
  Ps4 = 'ps4',
  Psynet = 'psynet',
  Steam = 'steam',
  Xbox = 'xbox',
}

export interface PlayerTeam {
  _id: string
  slug: string
  name: string
  region: Region
  relevant?: boolean
  image?: string
}

export enum Region {
  AF = 'AF',
  Asia = 'ASIA',
  Eu = 'EU',
  Me = 'ME',
  Na = 'NA',
  Oce = 'OCE',
  Sam = 'SAM',
}
