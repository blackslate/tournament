/**
 * src/App.jsx
 */


import { Provider} from './logic/Provider'
import { Inputs } from './components/Inputs'


export const App = () => {
  return (
    <Provider>
      <Inputs />
    </Provider>
  )
}