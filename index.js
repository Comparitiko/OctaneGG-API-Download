import { writeFile, mkdir, rm, readFile } from 'node:fs/promises'
import path from 'node:path'
import { stats } from './utils/utils.js'

const headers = { 'User-Agent': 'OctaneGG-API-Download' }
const DB_PATH = path.join(process.cwd(), './Database/')

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
    if (err.code === 'EEXIST') return
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
    console.log('Getting players stats')
    const playerData = await readFile(`${DB_PATH}/Players/players.json`).then(JSON.parse)
    await createDir('PlayersStats/')
    let numPage = 0
    let pageSize = 500
    while (pageSize === 500) {
      const players = playerData[numPage].players
      for (const player of players) {
        const tag = player.tag
        const id = player._id
        const filePath = await createDir(`PlayersStats/${tag}/`)
        console.log(`Page: ${numPage + 1} ------ Player: ${tag}`)
        for (const stat of stats) {
          const data = await doFetch(`https://zsr.octane.gg/stats/players?stat=${stat}&player=${id}`)
          await writeFile(`${filePath}${stat}.json`, JSON.stringify(data, null, 2), 'utf-8')
          sleep(2000)
        }
      }
      pageSize = playerData[numPage].pageSize
      numPage += 1
    }
    console.log('Players stats finished')
  } catch (err) {
    console.log(err)
  }
}

async function getTeamStats () {
  try {
    console.log('Getting teams stats')
    const teamsData = await readFile(`${DB_PATH}/Teams/teams.json`).then(JSON.parse)
    await createDir('TeamsStats/')
    let numPage = 0
    let pageSize = 500
    while (pageSize === 500) {
      const teams = teamsData[numPage].teams
      for (const team of teams) {
        const name = team.name
        const id = team._id
        const filePath = await createDir(`TeamsStats/${name}/`)
        console.log(`Page: ${numPage + 1} ------ Team: ${name}`)
        for (const stat of stats) {
          const data = await doFetch(`https://zsr.octane.gg/stats/teams?stat=${stat}&team=${id}`)
          await writeFile(`${filePath}${stat}.json`, JSON.stringify(data, null, 2), 'utf-8')
          sleep(2000)
        }
      }
      pageSize = teamsData[numPage].pageSize
      numPage += 1
    }
    console.log('Teams stats finished')
  } catch (err) {
    console.log(err)
  }
}

await removeDir()
await createDbPath()
await getEvents()
await getMatches()
await getGames()
await getPlayers()
await getTeams()
await getActiveTeams()
await getPlayerStats()
await getTeamStats()

console.log('All data downloaded')
