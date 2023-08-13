import { appendFile, writeFile, mkdir, rm, readFile } from 'node:fs/promises'
import path from 'node:path'

const headers = { 'User-Agent': 'OctaneGG-API-Download' }
const DB_PATH = path.join(process.cwd(), './Database/')

const playerStats = [
  'score',
  'goals',
  'assists',
  'saves',
  'shots',
  'shootingPercentage',
  'goalParticipation',
  'rating',
  'bpm',
  'bcpm',
  'amountCollected',
  'amountCollectedBig',
  'amountCollectedSmall',
  'amountStolen',
  'amountStolenBig',
  'amountStolenSmall',
  'avgSpeed',
  'avgSpeedPercentage',
  'totalDistance',
  'countPowerslide',
  'timePowerslide',
  'avgPowerslideDuration',
  'avgDistanceToBall',
  'avgDistanceToBallPossession',
  'avgDistanceToBallNoPossession',
  'avgDistanceToMates',
  'timeSupersonicSpeed',
  'timeBoostSpeed',
  'timeSlowSpeed',
  'percentSupersonicSpeed',
  'percentBoostSpeed',
  'percentSlowSpeed',
  'timeGround',
  'timeLowAir',
  'timeHighAir',
  'percentGround',
  'percentLowAir',
  'percentHighAir',
  'countCollectedBig',
  'countCollectedSmall',
  'countStolenBig',
  'countStolenSmall',
  'amountOverfill',
  'amountOverfillStolen',
  'amountUsedWhileSupersonic',
  'timeZeroBoost',
  'timeBoost0To25',
  'timeBoost25To50',
  'timeBoost50To75',
  'timeBoost75To100',
  'timeFullBoost',
  'percentZeroBoost',
  'percentBoost0To25',
  'percentBoost25To50',
  'percentBoost50To75',
  'percentBoost75To100',
  'percentFullBoost',
  'timeDefensiveThird',
  'timeNeutralThird',
  'timeOffensiveThird',
  'timeDefensiveHalf',
  'timeOffensiveHalf',
  'timeMostBack',
  'timeMostForward',
  'percentDefensiveThird',
  'percentNeutralThird',
  'percentOffensiveThird',
  'percentDefensiveHalf',
  'percentOffensiveHalf',
  'percentMostBack',
  'percentMostForward',
  'timeBehindBall',
  'timeInfrontBall',
  'timeClosestToBall',
  'timeFarthestFromBall',
  'percentBehindBall',
  'percentInfrontBall',
  'percentClosestToBall',
  'percentFarthestFromBall',
  'inflicted',
  'taken'
]

async function createDbPath () {
  try {
    await mkdir(DB_PATH)
    console.log('This is the DB path: ', DB_PATH)
  } catch (err) {
    if (err.code === 'EEXIST') return
    console.log(err)
  }
}

async function removeDir () {
  try {
    await rm(DB_PATH, { force: true, recursive: true })
  } catch (err) {
    console.log(err)
  }
}

async function createDir (dirName) {
  try {
    const filePath = `${DB_PATH}${dirName}`
    await mkdir(filePath)
    return filePath
  } catch (err) {
    console.log(err)
  }
}

async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function doFetch (url) {
  const response = await fetch(url, headers)
  const data = response.json()
  return data
}

async function getEvents () {
  console.log('📩 Getting events 📩')
  let page = 1
  let pageSize = 500
  let events = []
  const filePath = await createDir('Events/')
  try {
    while (pageSize === 500) {
      const data = await doFetch(`https://zsr.octane.gg/events?page=${page}&perPage=500`)
      console.log('Page: ', page)
      pageSize = data.pageSize
      page += 1
      events = events.concat(data)
      await sleep(2000)
    }
  } catch (err) {
    console.log(err)
  }
  await writeFile(`${filePath}events.json`, JSON.stringify(events, null, 2), 'utf-8')
  console.log('✔️ Finished get events ✔️')
}

async function getMatches () {
  console.log('📩 Getting matches 📩')
  let page = 1
  let pageSize = 500
  let matches = []
  const filePath = await createDir('Matches/')
  try {
    while (pageSize === 500) {
      const data = await doFetch(`https://zsr.octane.gg/matches?page=${page}&perPage=500`)
      console.log('Page: ', page)
      pageSize = data.pageSize
      console.log(pageSize)
      await sleep(2000)
      matches = matches.concat(data)
      page += 1
    }
  } catch (err) {
    console.log(err)
  }
  await writeFile(`${filePath}matches.json`, JSON.stringify(matches, null, 2), 'utf-8')
  console.log('✔️ Finished get matches ✔️')
}

async function getGames () {
  console.log('📩 Getting games 📩')
  let page = 1
  let pageSize = 500
  const filePath = await createDir('Games/')
  try {
    while (pageSize === 500) {
      const data = await doFetch(`https://zsr.octane.gg/games?page=${page}&perPage=500`)
      console.log('Page: ', page)
      pageSize = data.pageSize
      await sleep(2000)
      await writeFile(`${filePath}games-${page}.json`, JSON.stringify(data, null, 2), 'utf-8')
      page += 1
    }
  } catch (err) {
    console.log(err)
  }
  console.log('✔️ Finished get games ✔️')
}

async function getPlayers () {
  console.log('📩 Getting players 📩')
  let page = 1
  let pageSize = 500
  let players = []
  const filePath = await createDir('Players/')
  while (pageSize === 500) {
    try {
      const data = await doFetch(`https://zsr.octane.gg/players?page=${page}&perPage=500`)
      console.log('Page: ', page)
      pageSize = data.pageSize
      page += 1
      players = players.concat(data)
      await sleep(2000)
    } catch (err) {
      console.log(err)
    }
  }
  await writeFile(`${filePath}players.json`, JSON.stringify(players, null, 2), 'utf-8')
  console.log('✔️ Finished get players ✔️')
}

async function getTeams () {
  console.log('📩 Getting teams 📩')
  let page = 1
  let pageSize = 500
  let teams = []
  const filePath = await createDir('Teams/')
  while (pageSize === 500) {
    try {
      const data = await doFetch(`https://zsr.octane.gg/teams?page=${page}&perPage=500`)
      console.log('Page: ', page)
      pageSize = data.pageSize
      page += 1
      await sleep(2000)
      teams = teams.concat(data)
    } catch (err) {
      console.log(err)
    }
  }
  await writeFile(`${filePath}teams.json`, JSON.stringify(teams, null, 2), 'utf-8')
  console.log('✔️ Finished get teams ✔️')
}

async function getActiveTeams () {
  console.log('📩 Getting active teams 📩')
  let page = 1
  let pageSize = 500
  let activeTeams = []
  const filePath = await createDir('ActiveTeams/')
  while (pageSize === 500) {
    try {
      const data = await doFetch(`https://zsr.octane.gg/teams/active?page=${page}&perPage=500`)
      console.log('Page: ', page)
      pageSize = Object.keys(data.teams).length
      console.log(pageSize)
      page += 1
      activeTeams = activeTeams.concat(data.teams)
      await sleep(2000)
    } catch (err) {
      console.log(err)
    }
  }
  await writeFile(`${filePath}ActiveTeams.json`, JSON.stringify(activeTeams, null, 2), 'utf-8')
  console.log('✔️ Finished get active teams ✔️')
}

async function getPlayerStats () {
  try {
    const playerData = await readFile(`${DB_PATH}/Players/players.json`).then(JSON.parse)
  } catch (err) {
    console.log(err)
  }
}

async function getTeamStats () {

}

// await removeDir()
await createDbPath()
// await getEvents()
// await getMatches()
// await getGames()
// await getPlayers()
// await getTeams()
// await getActiveTeams()
await getPlayerStats()
// await getTeamStats()
