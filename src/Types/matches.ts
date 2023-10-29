export interface Matches {
  matches: Match[]
  page: number
  perPage: number
  pageSize: number
}

export interface Match {
  _id: string
  slug: string
  octane_id: string
  event: Event
  stage: Stage
  date: Date
  format: Format
  blue: Blue
  orange: Blue
  number: number
  games?: Game[]
  reverseSweepAttempt?: boolean
  reverseSweep?: boolean
}

export interface Blue {
  score?: number
  winner?: boolean
  team: BlueTeam
  players?: PlayerElement[]
}

export interface PlayerElement {
  player: PlayerPlayer
  stats: PlayerStats
  advanced: Advanced
}

export interface Advanced {
  goalParticipation: number
  rating: number
}

export interface PlayerPlayer {
  _id: string
  slug: string
  tag: string
  country?: Country
}

export enum Country {
  Ab = 'ab',
  Ar = 'ar',
  At = 'at',
  Au = 'au',
  Be = 'be',
  Br = 'br',
  CA = 'ca',
  Ch = 'ch',
  Cl = 'cl',
  De = 'de',
  Dk = 'dk',
  En = 'en',
  Es = 'es',
  Fi = 'fi',
  Fr = 'fr',
  It = 'it',
  Nl = 'nl',
  No = 'no',
  Nz = 'nz',
  SE = 'se',
  Us = 'us',
  Wl = 'wl',
}

export interface PlayerStats {
  core: Core
  boost?: Record<string, number>
  movement?: Record<string, number>
  positioning?: Record<string, number>
  demo?: Demo
}

export interface Core {
  shots: number
  goals: number
  saves: number
  assists: number
  score: number
  shootingPercentage: number
}

export interface Demo {
  inflicted: number
  taken: number
}

export interface BlueTeam {
  team: TeamTeam
  stats: TeamStats
}

export interface TeamStats {
  core: Core
  boost?: Record<string, number>
  movement?: Movement
  positioning?: Positioning
  demo?: Demo
}

export interface Movement {
  totalDistance: number
  timeSupersonicSpeed: number
  timeBoostSpeed: number
  timeSlowSpeed: number
  timeGround: number
  timeLowAir: number
  timeHighAir: number
  timePowerslide: number
  countPowerslide: number
}

export interface Positioning {
  timeDefensiveThird: number
  timeNeutralThird: number
  timeOffensiveThird: number
  timeDefensiveHalf: number
  timeOffensiveHalf: number
  timeBehindBall: number
  timeInfrontBall: number
}

export interface TeamTeam {
  _id: string
  slug?: string
  name: string
  image?: string
}

export interface Event {
  _id: string
  slug: string
  name: string
  region: Region
  mode: number
  tier: Tier
  image: string
  groups?: string[]
}

export enum Region {
  Eu = 'EU',
  Int = 'INT',
  Na = 'NA',
  Oce = 'OCE',
  Sam = 'SAM',
}

export enum Tier {
  A = 'A',
  B = 'B',
  C = 'C',
  Monthly = 'Monthly',
  S = 'S',
}

export interface Format {
  type: Type
  length: number
}

export enum Type {
  Best = 'best',
}

export interface Game {
  _id: string
  blue: number
  orange: number
  duration: number
  ballchasing?: string
}

export interface Stage {
  _id: number
  name: string
  format?: string
  qualifier?: boolean
  lan?: boolean
}
