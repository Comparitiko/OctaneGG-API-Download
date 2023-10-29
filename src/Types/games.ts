export interface Games {
  games: Game[]
  page: number
  perPage: number
  pageSize: number
}

export interface Game {
  _id: string
  octane_id: string
  number: number
  match: Match
  map: Map
  duration: number
  date: Date
  blue: Blue
  orange: Blue
  ballchasing?: string
  overtime?: boolean
}

export interface Blue {
  winner?: boolean
  matchWinner?: boolean
  team: BlueTeam
  players: PlayerElement[]
}

export interface PlayerElement {
  player: PlayerPlayer
  stats: PlayerStats
  advanced: Advanced
}

export interface Advanced {
  goalParticipation: number
  rating: number
  mvp?: boolean
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
  Au = 'au',
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
  ball?: Ball
  boost?: Record<string, number>
  movement?: Movement
  positioning?: Positioning
  demo?: Demo
}

export interface Ball {
  possessionTime: number
  timeInSide: number
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
  slug: string
  name: string
  image?: string
}

export interface Map {
  name: string
  id?: string
}

export interface Match {
  _id: string
  slug: string
  event: Event
  stage: Stage
  format: Format
}

export interface Event {
  _id: string
  slug: string
  name: string
  region: Region
  mode: number
  tier: Tier
  image: string
  groups?: Group[]
}

export enum Group {
  Rlcs = 'rlcs',
  Rlcs1 = 'rlcs1',
  Rlcs19 = 'rlcs19',
  Rlcs19Lp = 'rlcs19lp',
  Rlcs2 = 'rlcs2',
  Rlcs3 = 'rlcs3',
  Rlcs4 = 'rlcs4',
  Rlcs5 = 'rlcs5',
  Rlcseu = 'rlcseu',
  Rlcsna = 'rlcsna',
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
  S = 'S',
}

export interface Format {
  type: Type
  length: number
}

export enum Type {
  Best = 'best',
}

export interface Stage {
  _id: number
  name: Name
  format?: string
  qualifier?: boolean
  lan?: boolean
}

export enum Name {
  Finals = 'Finals',
  GroupStage = 'Group Stage',
  MainEvent = 'Main Event',
  Playoffs = 'Playoffs',
  PromotionPlayoffs = 'Promotion Playoffs',
  RegionalChampionship = 'Regional Championship',
}
