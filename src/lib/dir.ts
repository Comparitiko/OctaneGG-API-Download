import { mkdir, rm, appendFile } from 'node:fs/promises'
import path from 'node:path'

export const DB_PATH = path.join(process.cwd(), './Database/')

export async function saveErrors (url: string): Promise<void> {
  try {
    const filePath = await createDir('/Errors')
    appendFile(`${filePath}/Errors.txt`, `${url}\n`, {encoding: 'utf-8'})
  } catch (error) {
    console.log('Error' + error)
  }
}

// Function to replace names with dots to create dirs
export async function fixName (name: string): Promise<string> {
  return name.replace(/[.*?]/g, '')
}

// Function to create the DB directory
export async function createDbPath (): Promise<void> {
  try {
    await mkdir(DB_PATH)
    console.log('This is the DB path: ', DB_PATH)
  } catch (err) {
    console.log(err)
  }
}

// Function to remove the DB directory
export async function removeDBPath (): Promise<void> {
  try {
    await rm(DB_PATH, { force: true, recursive: true })
  } catch (err) {
    console.log(err)
  }
}

// Function to create a directory in the DB
export async function createDir (dirName: string): Promise<string> {
  try {
    const filePath = `${DB_PATH}${dirName}`
    await mkdir(filePath)
    return filePath
  } catch (err) {
    console.log(err)
    // Return the filepath without creating
    return `${DB_PATH}${dirName}`
  }
}
