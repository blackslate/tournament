/**
 * src/logic/Provider.jsx
 *
 * description
 */


import { createContext, useState, useReducer } from 'react'
import { reducer, initialState } from './Reducer'


export const Context = createContext()



export const Provider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const  {
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


  const setHighest = (payload) => {
    dispatch({
      type: "SET_HIGHEST",
      payload
    })
  }


  const setLowest = (payload) => {
    dispatch({
      type: "SET_LOWEST",
      payload
    })
  }


  const setPlayersPerGroup = (payload) => {
    dispatch({
      type: "SET_PLAYERS_PER_GROUP",
      payload
    })
  }


  const setPlayerCount = (payload) => {
    dispatch({
      type: "SET_PLAYER_COUNT",
      payload
    })
  }


  const setLowSeed = (payload) => {
    dispatch({
      type: "SET_LOW_SEED",
      payload
    })
  }


  const setLastSeed = (payload) => {
    dispatch({
      type: "SET_LAST_SEED",
      payload
    })
  }


  return (
    <Context.Provider
      value ={{
        highest,
        lowest,
        playersPerGroup,
        playerCount,
        lowSeed,
        lastSeed,

        setHighest,
        setLowest,
        setPlayersPerGroup,
        setPlayerCount,
        setLowSeed,
        setLastSeed,

        groupCount,
        lowSeedRank,
        lastSeedRank
      }}
    >
      {children}
    </Context.Provider>
  )
}