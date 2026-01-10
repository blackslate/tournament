/**
 * src/components/ControlPoints.jsx
 */


import { useContext } from 'react'
import { Context } from '../logic/Provider'


export const ControlPoints = () => {
  const { xy } = useContext(Context)


  const points = Object.entries(xy).map(([ name, value ]) => (
    <li
      key={name}
    >
      <span>{name}</span>
      <span>{value.toFixed(1)}</span>
    </li>
  ))


  return (
    <ul className="control-points">
      {points}
    </ul>
  )
}