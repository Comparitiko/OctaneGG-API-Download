export interface Events {
  events: Event[]
  page: number
  perPage: number
  pageSize: number
}

export interface Event {
  _id: string
  slug: string
  name: string
  startDate: Date
  endDate: Date
  region: Region
  mode: number
  prize: Prize
  tier: Tier
  image: string
  groups?: string[]
  stages: Stage[]
}

export interface Prize {
  amount: number
  currency: Currency
}

export enum Currency {
  Aud = 'AUD',
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD',
}

export enum Region {
  Asia = 'ASIA',
  Eu = 'EU',
  Int = 'INT',
  Me = 'ME',
  Na = 'NA',
  Oce = 'OCE',
  Sam = 'SAM',
}

export interface Stage {
  _id: number
  name: string
  format?: string
  region?: Region
  startDate: Date
  endDate: Date
  liquipedia?: string
  qualifier?: boolean
  prize?: Prize
  lan?: boolean
  location?: Location
  substages?: Substage[]
}

export interface Location {
  venue?: string
  city: string
  country: string
}

export interface Substage {
  _id: number
  name: string
  format: string
}

export enum Tier {
  A = 'A',
  B = 'B',
  C = 'C',
  Monthly = 'Monthly',
  S = 'S',
  Weekly = 'Weekly',
}
