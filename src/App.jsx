/**
 * src/App.jsx
 */


import { Provider} from './logic/Provider'
import { Canvas } from './components/Canvas'
import { SVG } from './components/SVG'
import { Inputs } from './components/Inputs'


export const App = () => {
  return (
    <Provider>
      <main>
        <Canvas />
        <SVG />
        <Inputs />
      </main>
    </Provider>
  )
}