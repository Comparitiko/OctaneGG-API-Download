import { writeFile, mkdir, rm, readFile } from 'node:fs/promises'
import path from 'node:path'
import { stats } from '../utils/utils'

const headers = { 'User-Agent': 'OctaneGG-API-Download' }
const DB_PATH = path.join(process.cwd(), './Database/')

// Function to create the DB
export async function createDbPath() {
  try {
    await mkdir(DB_PATH)
    console.log('This is the DB path: ', DB_PATH)
  } catch (err) {
    if (err === 'EEXIST')
      console.log(err)
  }
}
