/**
 * src/App.jsx
 */


import { Provider} from './logic/Provider'
import { Graph } from './components/Graph'
import { SVG } from './components/SVG'
import { Inputs } from './components/Inputs'


export const App = () => {
  return (
    <Provider>
      <main>
        <Graph />
        <SVG />
        <Inputs />
      </main>
    </Provider>
  )
}