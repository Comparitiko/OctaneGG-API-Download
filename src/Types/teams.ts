export interface Teams {
  teams: Team[]
  page: number
  perPage: number
  pageSize: number
}

export interface Team {
  _id: string
  slug: string
  name: string
  region?: Region
  image?: string
  relevant?: boolean
}

export enum Region {
  Asia = 'ASIA',
  Eu = 'EU',
  Int = 'INT',
  Na = 'NA',
  Oce = 'OCE',
  Sam = 'SAM',
}
