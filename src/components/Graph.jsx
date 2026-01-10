/**
 * src/components/Graph.jsx
 */


import { useContext } from 'react'
import { Context } from '../logic/Provider'


export const Graph = () => {
  const { graph } = useContext(Context)


  return (
    <img
      id="graph"
      src={graph}
      alt=""
    />
  )
}