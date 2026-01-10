/**
 * CustomReducer.jsx
 *
 * Use useReducer when:
 * + The next state depends on the previous state
 * + The state is complex
 * + You want to keep business logic:
 *   + as a pure function
 *   + in a separate module
 * + You want to be able to test easily
 */


const initialState = {
  // Set manually
  highest:         100,
  lowest:          100,
  playersPerGroup: 2,
  playerCount:     2,
  lowSeed:         10,
  lastSeed:        10,
  // Calculated
  groupCount:      1,
  lowSeedRank:     1, // duplicate of groupCount
  lastSeedRank:    1,

  // Control points
  xy: {
    P2y: 78,
    P3x: 50,
    P3y: 18
  }
}


const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case "SET_HIGHEST":
      return setHighest(state, payload)

    case "SET_LOWEST":
      return setLowest(state, payload)

    case "SET_PLAYERS_PER_GROUP":
      return setPlayersPerGroup(state, payload)

    case "SET_PLAYER_COUNT":
      return setPlayerCount(state, payload)

    case "SET_LOW_SEED":
      return setLowSeed(state, payload)

    case "SET_LAST_SEED":
      return setLastSeed(state, payload)

    case "SET_XY":
      return setXY(state, payload)

    default:
      return {...state}
  }
}


const setHighest = (state, highest) => {
  return { ...state, highest }
}


const setLowest = (state, lowest) => {
  return { ...state, lowest }
}


const setPlayersPerGroup = (state, playersPerGroup) => {
  let { playerCount, lowSeedRank, lastSeedRank } = state
  const groupCount = Math.ceil(playerCount / playersPerGroup)
  lowSeedRank = groupCount
  lastSeedRank = groupCount * 2
  return {
    ...state,
    playersPerGroup,
    groupCount,
    lowSeedRank,
    lastSeedRank
  }
}


const setPlayerCount = (state, playerCount) => {
  let { playersPerGroup, lowSeedRank, lastSeedRank } = state
  const groupCount = Math.ceil(playerCount / playersPerGroup)
  lowSeedRank = groupCount
  lastSeedRank = groupCount * 2
  return {
    ...state,
    playersPerGroup,
    playerCount,
    groupCount,
    lowSeedRank,
    lastSeedRank
  }
}


const setLowSeed = (state, lowSeed) => {
  return { ...state, lowSeed }
}


const setLastSeed = (state, lastSeed) => {
  return { ...state, lastSeed }
}


const setXY = (state, xy) => {
  return { ...state, xy }
}


export { reducer, initialState }
