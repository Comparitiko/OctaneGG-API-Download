import { createDbPath, removeDBPath } from './lib/dir.js'
import { getEvents, getMatches, getGames, getPlayers, getTeams, getActiveTeams, getPlayerStats, getTeamStats } from './lib/api.js'
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
