import { createDbPath, removeDBPath } from './lib/dir'
import { getEvents, getMatches, getGames, getPlayers, getTeams, getActiveTeams, getPlayerStats, getTeamStats } from './lib/api'
console.log('⌛ Getting all data ⌛')

await removeDBPath()
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
