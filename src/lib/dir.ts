import { mkdir, rm } from 'node:fs/promises'
import path from 'node:path'


const DB_PATH = path.join(process.cwd(), './Database/')

// Function to create the DB directory
export async function createDbPath() {

  try {

    await mkdir(DB_PATH)
    console.log('This is the DB path: ', DB_PATH)

  } catch (err) {

    console.log(err)

  }

}

// Function to remove the DB directory
export async function removeDBPath() {

  try {

    await rm(DB_PATH, { force: true, recursive: true })

  } catch (err) {

    console.log(err)

  }

}

// Function to create a directory in the DB
export async function createDir(dirName: string) {

  try {

    const filePath = `${DB_PATH}${dirName}`
    await mkdir(filePath)
    return filePath

  } catch (err) {

    console.log(err);

  }
}
