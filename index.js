import { appendFile, writeFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'

const headers = { 'User-Agent': 'OctaneGG-API-Download' }
const DB_PATH = path.join(process.cwd(), './Database/')

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

async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function getEvents () {
  console.log('📩 Getting events 📩')
  let page = 1
  let pageSize = 500
  let events = []
  const filePath = await createDir('Events/')
  try {
    while (pageSize === 500) {
      await fetch(`https://zsr.octane.gg/events?page=${page}&perPage=500`, headers)
        .then(response => response.json())
        .then(async data => {
          console.log('Page: ', page)
          pageSize = data.pageSize
          events = events.concat(data)
          page += 1
          await sleep(2000)
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
  let pageSize = 500
  const filePath = await createDir('Matches/')
  try {
    while (pageSize === 500) {
      await fetch(`https://zsr.octane.gg/matches?page=${page}&perPage=500`, headers)
        .then(response => response.json())
        .then(async data => {
          console.log('Page: ', page)
          pageSize = data.pageSize
          console.log(pageSize)
          if (page === 1) await writeFile(`${filePath}matches.json`, JSON.stringify(data, null, 2), 'utf-8')
          await appendFile(`${filePath}matches.json`, JSON.stringify(data, null, 2), 'utf-8')
          page += 1
          await sleep(2000)
        })
    }
  } catch (err) {
    console.log(err)
  }
  console.log('✔️ Finished get matches ✔️')
}

async function getGames () {
  console.log('📩 Getting games 📩')
  let page = 1
  let pageSize = 500
  const filePath = await createDir('Games/')
  try {
    while (pageSize === 500) {
      await fetch(`https://zsr.octane.gg/games?page=${page}&perPage=500`, headers)
        .then(response => response.json())
        .then(async data => {
          console.log('Page: ', page)
          pageSize = data.pageSize
          console.log(pageSize)
          await writeFile(`${filePath}games-${page}.json`, JSON.stringify(data, null, 2), 'utf-8')
          // await sleep(2000)
          page += 1
        })
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
  const filePath = await createDir('Players/')
  while (pageSize === 500) {
    try {
      await fetch(`https://zsr.octane.gg/players?page=${page}&perPage=500`, headers)
        .then(response => response.json())
        .then(async data => {
          console.log('Page: ', page)
          pageSize = data.pageSize
          page += 1
          await sleep(2000)
          if (page === 1) await writeFile(`${filePath}players.json`, JSON.stringify(data, null, 2), 'utf-8')
          await appendFile(`${filePath}players.json`, JSON.stringify(data, null, 2), 'utf-8')
        })
    } catch (err) {
      console.log(err)
    }
  }
  console.log('✔️ Finished get players ✔️')
}

async function getTeams () {
  console.log('📩 Getting teams 📩')
  let page = 1
  let pageSize = 500
  const filePath = await createDir('Teams/')
  while (pageSize === 500) {
    try {
      await fetch(`https://zsr.octane.gg/teams?page=${page}&perPage=500`, headers)
        .then(response => response.json())
        .then(async data => {
          console.log('Page: ', page)
          pageSize = data.pageSize
          page += 1
          await sleep(2000)
          if (page === 1) await writeFile(`${filePath}teams.json`, JSON.stringify(data, null, 2), 'utf-8')
          await appendFile(`${filePath}teams.json`, JSON.stringify(data, null, 2), 'utf-8')
        })
    } catch (err) {
      console.log(err)
    }
  }
  console.log('✔️ Finished get players ✔️')
}

await removeDir()
await createDbPath()
await getEvents()
await getMatches()
await getGames()
await getPlayers()
await getTeams()
