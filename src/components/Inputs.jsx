/**
 * src/components/Inputs.jsx
 * 
 * Provides inputs for:
 * 
 *  + Highest rating
 *  + Lowest rating
 *  + Number of players
 *  + Number of players per group
 *  + Rating of lowest first seed
 *  + Rating of lowest second seed
 * 
 * Calculates and displays:
 *  + Number of groups
 *  + Rank of lowest first seed
 *  + Rank of lowest second seed
 */


import { useContext } from 'react'
import { Context } from '../logic/Provider'
import { Input } from './Input'
import { Import } from './Import'
import { ControlPoints } from './ControlPoints'



export const Inputs = () => {
  const {
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
    lastSeedRank,
    urls
  } = useContext(Context)


  const settings = [
    [playersPerGroup, setPlayersPerGroup, 12, 2],
    [playerCount,     setPlayerCount,     99999],
    [groupCount,      { name: "Number of Groups" }],

    [highest,         setHighest,         3000, lowest],
    [lowSeed,         setLowSeed,         highest, 100 ],
    [lowSeedRank,     { name: "Low Seed Rank" }],
    [lastSeed,        setLastSeed,        highest, 100],
    [lastSeedRank,     { name: "Last Seed Rank" }],
    [lowest,          setLowest,          highest - 1, 100]
  ].map(([ value, setter, max, min ]) => {
    const key = setter.name.replace("set", "")
    return (
      <
        Input
        key={key}
        name={key}
        value={value}
        setter={setter}
        min={min}
        max={max}
      />
    )
  })


  return (
    <div id="inputs">
      <Import />
      <hr />
      {settings}
      <ControlPoints />
    </div>
  )
}