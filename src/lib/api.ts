import { createDir, fixName, DB_PATH } from './dir.js'
import { writeFile, readFile } from 'fs/promises'
import { stats } from '../utils/utils.js'
import { type Players } from '../Types/players'
import { type Teams } from '../Types/teams'
import { type Events } from '../Types/events'
import { type Games } from '../Types/games'
import { type ActiveTeams } from '../Types/activeTeams'
import { type TeamStats } from '../Types/teamStats'
import { type PlayerStats } from '../Types/playerStats'
import { type Matches } from '../Types/matches'

// Function to fetch urls
export async function doFetch<T> (url: string): Promise<T> {
  const response = await fetch(url)
  const data = response.json()
  return await data as T
}

// Get all the events
export async function getEvents (): Promise<void> {
  console.log('📩 Getting events 📩')
  let page = 1
  let pageSize = 500
  let events: Events[] = []
  const filePath = await createDir('Events/')
    while (pageSize === 500) {
      try {
        const data: Events = await doFetch(
          `https://zsr.octane.gg/events?page=${page}&perPage=500`
        )
        console.log('Page: ', page)
        pageSize = data.pageSize
        page += 1
        events = events.concat(data)
      } catch (err) {
        console.log('Error' + err)
      }
    }
  await writeFile(
    `${filePath}events.json`,
    JSON.stringify(events, null, 2),
    'utf-8'
  )
  console.log('✔️ Finished get events ✔️')
}

// Get all the series played
export async function getMatches (): Promise<void> {
  console.log('📩 Getting matches 📩')
  let page = 1
  let pageSize = 500
  const filePath = await createDir('Matches/')
    while (pageSize === 500) {
      try {
        const data: Matches = await doFetch(
          `https://zsr.octane.gg/matches?page=${page}&perPage=500`
        )
        console.log('Page: ', page)
        pageSize = data.pageSize
        await writeFile(
          `${filePath}matches-${page}.json`,
          JSON.stringify(data, null, 2),
          'utf-8'
        )
        page += 1
      } catch (err) {
        console.log('Error' + err)
      }
    }
  console.log('✔️ Finished get matches ✔️')
}

// Get all the games played
export async function getGames (): Promise<void> {
  console.log('📩 Getting games 📩')
  let page = 1
  let pageSize = 500
  const filePath = await createDir('Games/')
    while (pageSize === 500) {
      try {
        const data: Games = await doFetch(
          `https://zsr.octane.gg/games?page=${page}&perPage=500`
        )
        console.log('Page: ', page)
        pageSize = data.pageSize
        await writeFile(
          `${filePath}games-${page}.json`,
          JSON.stringify(data, null, 2),
          'utf-8'
        )
        page += 1
      } catch (err) {
        console.log('Error' + err)
      }
    }
  console.log('✔️ Finished get games ✔️')
}

// Get all the players
export async function getPlayers (): Promise<void> {
  console.log('📩 Getting players 📩')
  let page = 1
  let pageSize = 500
  let players: Players[] = []
  const filePath = await createDir('Players/')
  while (pageSize === 500) {
    try {
      const data: Players = await doFetch(
        `https://zsr.octane.gg/players?page=${page}&perPage=500`
      )
      console.log('Page: ', page)
      pageSize = data.pageSize
      page += 1
      players = players.concat(data)
    } catch (err) {
      console.log('Error' + err)
    }
  }
  await writeFile(
    `${filePath}players.json`,
    JSON.stringify(players, null, 2),
    'utf-8'
  )
  console.log('✔️ Finished get players ✔️')
}

// Get all the teams
export async function getTeams (): Promise<void> {
  console.log('📩 Getting teams 📩')
  let page = 1
  let pageSize = 500
  let teams: Teams[] = []
  const filePath = await createDir('Teams/')
  while (pageSize === 500) {
    try {
      const data: Teams = await doFetch(
        `https://zsr.octane.gg/teams?page=${page}&perPage=500`
      )
      console.log('Page: ', page)
      pageSize = data.pageSize
      page += 1
      teams = teams.concat(data)
    } catch (err) {
      console.log('Error' + err)
    }
  }
  await writeFile(
    `${filePath}teams.json`,
    JSON.stringify(teams, null, 2),
    'utf-8'
  )
  console.log('✔️ Finished get teams ✔️')
}

// Get active teams
export async function getActiveTeams (): Promise<void> {
  console.log('📩 Getting active teams 📩')
  let page = 1
  let pageSize = 500
  const activeTeams: ActiveTeams = { teams: [] }
  const filePath = await createDir('ActiveTeams/')
  while (pageSize === 500) {
    try {
      const data: ActiveTeams = await doFetch(
        `https://zsr.octane.gg/teams/active?page=${page}&perPage=500`
      )
      console.log('Page: ', page)
      pageSize = Object.keys(data.teams).length
      page += 1
      activeTeams.teams = activeTeams.teams.concat(data.teams)
    } catch (err) {
      console.log('Error' + err)
    }
  }
  await writeFile(
    `${filePath}ActiveTeams.json`,
    JSON.stringify(activeTeams, null, 2),
    'utf-8'
  )
  console.log('✔️ Finished get active teams ✔️')
}

// Get all stats of players by their id
export async function getPlayerStats (): Promise<void> {
    console.log('Getting players stats')
    const playerData: Players[] = JSON.parse(await readFile(`${DB_PATH}/Players/players.json`, { encoding: 'utf-8' }))
    await createDir('PlayersStats/')
    let numPage = 0
    let pageSize = 500
    let numPlayer = 1
    while (pageSize === 500) {
      try {
        const players = playerData[numPage].players
        for (const player of players) {
          const tag = player.tag
          const fixedTag = await fixName(tag)
          const id = player._id
          const filePath = await createDir(`PlayersStats/${fixedTag}/`)
          console.log(
            `Page: ${numPage + 1
            } ------ PlayerNum:${numPlayer} ------ Player: ${fixedTag}`
          )
          numPlayer += 1
          if (numPlayer === 501) numPlayer = 1
          for (const stat of stats) {
            const data: PlayerStats = await doFetch(
              `https://zsr.octane.gg/stats/players?stat=${stat}&player=${id}`
            )
            await writeFile(
              `${filePath}${stat}.json`,
              JSON.stringify(data, null, 2),
              'utf-8'
            )
          }
        }
        pageSize = playerData[numPage].pageSize
        numPage += 1
        console.log('Players stats finished')
      } catch (err) {
        console.log('Error' + err)
      }
    }
}

// Get all stats of teams by their id
export async function getTeamStats (): Promise<void> {
    console.log('Getting teams stats')
    const teamsData: Teams[] = JSON.parse(await readFile(`${DB_PATH}/Teams/teams.json`, { encoding: 'utf-8' }))
    await createDir('TeamsStats/')
    let numPage = 0
    let pageSize = 500
    let numTeam = 1
    while (pageSize === 500) {
      try {
        const teams = teamsData[numPage].teams
        for (const team of teams) {
          const name = team.name
          const fixedName = await fixName(name)
          const id = team._id
          const filePath = await createDir(`TeamsStats/${fixedName}/`)
          console.log(
            `Page: ${numPage + 1
            } ------ TeamNum:${numTeam} ------ Team: ${fixedName}`
          )
          numTeam += 1
          if (numTeam === 501) numTeam = 1
          for (const stat of stats) {
            const data: TeamStats = await doFetch(
              `https://zsr.octane.gg/stats/teams?stat=${stat}&team=${id}`
            )
            await writeFile(
              `${filePath}${stat}.json`,
              JSON.stringify(data, null, 2),
              'utf-8'
            )
          }
        }
        pageSize = teamsData[numPage].pageSize
        numPage += 1
      console.log('Teams stats finished')
      } catch (err) {
        console.log('Error' + err)
      }
    }
}
