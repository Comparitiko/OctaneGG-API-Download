export interface PlayerStats {
  stats: Stat[];
}

export interface Stat {
  player: Player;
  events: Event[];
  teams: Opponent[];
  opponents: Opponent[];
  startDate: Date;
  endDate: Date;
  games: Games;
  matches: Matches;
  stats: Stats;
}

export interface Event {
  _id: string;
  slug: string;
  name: string;
  region: Region;
  mode: number;
  tier: Tier;
  image: string;
  groups?: string[];
}

export enum Region {
  Eu = "EU",
  Int = "INT",
}

export enum Tier {
  A = "A",
  B = "B",
  C = "C",
  Qualifier = "Qualifier",
  S = "S",
  Weekly = "Weekly",
}

export interface Games {
  total: number;
  replays: number;
  wins: number;
  seconds: number;
  replaySeconds: number;
}

export interface Matches {
  total: number;
  replays: number;
  wins: number;
}

export interface Opponent {
  _id: string;
  slug: string;
  name: string;
  image?: string;
  region?: Region;
  relevant?: boolean;
}

export interface Player {
  _id: string;
  slug: string;
  tag: string;
  country: string;
}

export interface Stats {
  score: number
  goals: number
  assists: number
  saves: number
  shots: number
  shootingPercentage: number
  goalParticipation: number
  rating: number
  bpm: number
  bcpm: number
  amountCollected: number
  amountCollectedBig: number
  amountCollectedSmall: number
  amountStolen: number
  amountStolenBig: number
  amountStolenSmall: number
  avgSpeed: number
  avgSpeedPercentage: number
  totalDistance: number
  countPowerslide: number
  timePowerslide: number
  avgPowerslideDuration: number
  avgDistanceToBall: number
  avgDistanceToBallPossession: number
  avgDistanceToBallNoPossession: number
  avgDistanceToMates: number
  timeSupersonicSpeed: number
  timeBoostSpeed: number
  timeSlowSpeed: number
  percentSupersonicSpeed: number
  percentBoostSpeed: number
  percentSlowSpeed: number
  timeGround: number
  timeLowAir: number
  timeHighAir: number
  percentGround: number
  percentLowAir: number
  percentHighAir: number
  countCollectedBig: number
  countCollectedSmall: number
  countStolenBig: number
  countStolenSmall: number
  amountOverfill: number
  amountOverfillStolen: number
  amountUsedWhileSupersonic: number
  timeZeroBoost: number
  timeBoost0To25: number
  timeBoost25To50: number
  timeBoost50To75: number
  timeBoost75To100: number
  timeFullBoost: number
  percentZeroBoost: number
  percentBoost0To25: number
  percentBoost25To50: number
  percentBoost50To75: number
  percentBoost75To100: number
  percentFullBoost: number
  timeDefensiveThird: number
  timeNeutralThird: number
  timeOffensiveThird: number
  timeDefensiveHalf: number
  timeOffensiveHalf: number
  timeMostBack: number
  timeMostForward: number
  percentDefensiveThird: number
  percentNeutralThird: number
  percentOffensiveThird: number
  percentDefensiveHalf: number
  percentOffensiveHalf: number
  percentMostBack: number
  percentMostForward: number
  timeBehindBall: number
  timeInfrontBall: number
  timeClosestToBall: number
  timeFarthestFromBall: number
  percentBehindBall: number
  percentInfrontBall: number
  percentClosestToBall: number
  percentFarthestFromBall: number
  inflicted: number
  taken: number
}
