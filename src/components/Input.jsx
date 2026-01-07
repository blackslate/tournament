/**
 * src/components/Input.jsx
 * 
 * TO FIX: User should be able to select entire numerical
 * text and start typing a number, which may initially be
 * less than min. The number should revert to the previous
 * valid value only if it remains below min for an extended
 * time.
 */


import React from 'react'

const MOVES = [
  "Backspace",
  "Delete",
  "ArrowRight",
  "ArrowLeft",
  "ArrowUp",
  "ArrowDown",
  "Shift",
  "Tab"
]


export const Input = ({ name, value, setter, max, min  }) => {

  name = name.replace(/([A-Z])/g, " $1").trim()


  const setValue = ({target}) => {
    const value = Number(target.value)
    setter(value)
  }


  const filterForNumbers = (event) => {
    const { key, repeat, shiftKey, altKey } = event

    if (isNaN(key) && MOVES.indexOf(key) < 0) {
      return event.preventDefault()
    }

    if ( key === "ArrowUp" || key === "ArrowDown" ) {
      event.preventDefault()
      if (!repeat) {
        const delta = ((key === "ArrowUp")
          ? 1
          : -1
        ) * (1 + 9 * shiftKey) * (1 + 9 * altKey)

        const newValue = value + delta
        clipToMax({ target: { value: newValue }})
      }
    }
  }


  const clipToMax = ({ target }) => {
    const newValue = Number(target.value)
    if ( newValue < min || newValue > max) {
      // TODO: beep or flash
      return
    }
    
    setter(newValue)
  }


  const rangeInput = () => {
    return (
      <>
        <span>{name}</span>
        <div className="range">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={setValue}
          />
          <input
            type="text"
            value={value}
            onKeyDown={filterForNumbers}
            onKeyUp={clipToMax}
            onChange={clipToMax}
          />
        </div>
      </>
    )
  }


  const numberInput = () => {
    return (
      <>
        <div className="simple">
          <span>{name}</span>
          <input
            type="text"
            value={value}
            onKeyDown={filterForNumbers}
            onKeyUp={clipToMax}
            onChange={clipToMax}
          />
        </div>
      </>
    )
  }


  const infoOnly = () => {
    return (
      <>
        <div className="info">
          <span>{name}</span>
          <span>{value}</span>
        </div>
      </>
    )
  }


  const layout = (min) 
    ? rangeInput()
    : (max)
      ? numberInput()
      : infoOnly()


  return (
    <div className="input">
      {layout}
    </div>
  )
}