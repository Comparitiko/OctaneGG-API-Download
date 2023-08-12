import { writeFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'

const baseURL = 'https://zsr.octane.gg/'
const headers = { 'User-Agent': 'OctaneGG-API-Download' }
const perPage = 200
let pageSize = 200
let Page = 1

async function createDir () {
  const DB_PATH = path.join(process.cwd(), './database')
  await mkdir(DB_PATH)
  return DB_PATH
}

async function removeDir () {
  await rm(DB_PATH, { force: true, recursive: true })
}

async function getEvents () {
  let events = []
  while (pageSize === 200) {
    await fetch(`${baseURL}events?Page=${Page}&perPage=${perPage}`, headers)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        console.log('Pagina: ', Page)
        pageSize = data.pageSize
        events = events.concat(data)
        Page += 1
      })
  }
  await writeFile(`${DB_PATH}events.json`, JSON.stringify(events, null, 2), 'utf-8')
}

const DB_PATH = await createDir()
console.log(DB_PATH)
// await getEvents()
await removeDir()
