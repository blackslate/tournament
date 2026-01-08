/**
 * src/logic/Provider.jsx
 *
 * description
 */


import {
  createContext,
  useReducer,
  useState,
  useEffect
} from 'react'
import { reducer, initialState } from './Reducer'

const URLS_FILE = "/tournament/tournaments.json"



export const Context = createContext()



export const Provider = ({ children }) => {
  const [ urls, setUrls ] = useState([])
  
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const {
    highest,
    lowest,
    playerCount,
    playersPerGroup,
    lowSeed,
    lastSeed,

    groupCount,
    lowSeedRank,
    lastSeedRank
  } = state


  const getUrls = () => {
    fetch(URLS_FILE)
    .then(response => response.json())
    .then(json => setUrls(json))
    .catch(error => console.error(error))
  }


  const setHighest =  payload => {
    dispatch({
      type: "SET_HIGHEST",
      payload
    })
  }


  const setLowest =  payload => {
    dispatch({
      type: "SET_LOWEST",
      payload
    })
  }


  const setPlayersPerGroup =  payload => {
    dispatch({
      type: "SET_PLAYERS_PER_GROUP",
      payload
    })
  }


  const setPlayerCount =  payload => {
    dispatch({
      type: "SET_PLAYER_COUNT",
      payload
    })
  }


  const setLowSeed =  payload => {
    dispatch({
      type: "SET_LOW_SEED",
      payload
    })
  }


  const setLastSeed =  payload => {
    dispatch({
      type: "SET_LAST_SEED",
      payload
    })
  }


  const setFromJSON = data => {
    setHighest(data.highest)
    setLowest(data.lowest)
    setPlayersPerGroup(data.playersPerGroup)
    setPlayerCount(data.playerCount)
    setLowSeed(data.lowSeed)
    setLastSeed(data.lastSeed)
    
  }


  const treatImport = json => {
    // Assume json ordered by rating (item 0 in each array)
    // [ [2426, "ripol", 1],
    //   [2266, "geniusshi", 3],
    //   ...,
    //   [100, "gazi0244", 95]
    // ]
    
    let data = {
      highest:         0,
      lowest:          9999,
      playerCount:     json.length,
      playersPerGroup: 0,
      lowSeed:         0,
      lastSeed:        0
    }
    let groupCount = 0 // set within reduce callback

    data = json.reduce(( data, player, index ) => {
      const [ rating,, groupNumber ] = player
        if ( data.highest < rating ) {
          data.highest = rating 
        }
        if ( data.lowest > rating ) {
          data.lowest = rating 
        }
        if ( groupCount < groupNumber ) {
          groupCount = groupNumber 
        }

      return data
    }, data)

    data.playersPerGroup = Math.ceil(
      data.playerCount / groupCount
    )
    data.lowSeed       = json[groupCount][0]
    data.lastSeed      = json[groupCount * 2][0]

    setFromJSON(data)
  }


  const importFrom = url => {
    fetch(url)
    .then(response => response.json())
    .then(treatImport)
    .catch(error => {})
  }


  useEffect(getUrls, [])


  return (
    <Context.Provider
      value ={{
        highest,
        lowest,
        playersPerGroup,
        playerCount,
        lowSeed,
        lastSeed,
        urls,

        setHighest,
        setLowest,
        setPlayersPerGroup,
        setPlayerCount,
        setLowSeed,
        setLastSeed,
        importFrom,

        groupCount,
        lowSeedRank,
        lastSeedRank
      }}
    >
      {children}
    </Context.Provider>
  )
}