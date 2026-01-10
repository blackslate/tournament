/**
 * src/components/Import.jsx
 */


import { useContext } from 'react'
import { Context } from '../logic/Provider'


export const Import = () => {
  const { urls, importFrom } = useContext(Context)


  const doImport = ({ target }) => {
    importFrom(target.value)
  }


  const options = urls.map( url => (
    <option
      key={url}
      value={url}
    >
      { url
        .replace(/^[a-z\/]+/i, "")
        .replace(".json", "")
      }
    </option>
  ))
  // options.unshift(<option
  //     key="choose"
  //     value=""
  //     disabled
  //   >
  //     Custom
  //   </option>
  // )


  return (
    <div className="import">
      <span>Import Tournament</span>
      <select
        onChange={doImport}
      >
        {options}
      </select>
    </div>
  )
}