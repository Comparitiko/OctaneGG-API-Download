import { writeFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'

const headers = { 'User-Agent': 'OctaneGG-API-Download' }
const DB_PATH = path.join(process.cwd(), './database/')

async function createDbPath () {
  try {
    await mkdir(DB_PATH)
    console.log('This is the DB path: ', DB_PATH)
  } catch (err) {
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

async function getEvents () {
  console.log('📩 Getting events 📩')
  let page = 1
  let pageSize = 200
  let events = []
  const filePath = await createDir('Events/')
  try {
    while (pageSize === 200) {
      await fetch(`https://zsr.octane.gg/events?page=${page}&perPage=200`, headers)
        .then(response => response.json())
        .then(data => {
          console.log('Page: ', page)
          pageSize = data.pageSize
          events = events.concat(data)
          page += 1
        })
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
  let pageSize = 200
  let matches = []
  const filePath = await createDir('Matches/')
  try {
    while (pageSize === 200) {
      await fetch(`https://zsr.octane.gg/matches?page=${page}&perPage=200`, headers)
        .then(response => response.json())
        .then(data => {
          console.log('Page: ', page)
          pageSize = data.pageSize
          matches = matches.concat(data)
          page += 1
        })
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
  let pageSize = 200
  let games = []
  const filePath = await createDir('Games/')
  try {
    while (pageSize === 200) {
      await fetch(`https://zsr.octane.gg/games?page=${page}&perPage=200`, headers)
        .then(response => response.json())
        .then(data => {
          console.log('Page: ', page)
          pageSize = data.pageSize
          games = games.concat(data)
          page += 1
        })
    }
  } catch (err) {
    console.log(err)
  }
  await writeFile(`${filePath}games.json`, JSON.stringify(games, null, 2), 'utf-8')
  console.log('✔️ Finished get games ✔️')
}

async function getPlayers () {
  console.log('📩 Getting players 📩')
  let page = 1
  let pageSize = 200
  let players = []
  const filePath = await createDir('Players/')
  try {
    while (pageSize === 200) {
      await fetch(`https://zsr.octane.gg/players?page=${page}&perPage=200`, headers)
        .then(response => response.json())
        .then(data => {
          console.log('Page: ', page)
          pageSize = data.pageSize
          players = players.concat(data)
          page += 1
        })
    }
  } catch (err) {
    console.log(err)
  }
  await writeFile(`${filePath}players.json`, JSON.stringify(players, null, 2), 'utf-8')
  console.log('✔️ Finished get players ✔️')
}

await removeDir()
await createDbPath()
await getEvents()
await getMatches()
await getGames()
await getPlayers()
