/**
 * src/components/SVG.jsx
 *
 * Graph of rank vs rating of all players in a chess tournament
 *
 * Generates an SVG element with:
 * + A square frame 100 x 100
 * + Horizontal and vertical lines to show the ranks and ratings
 *   of the lowest ranked top seed, and of the lowest ranked
 *   second seed
 * + Text annotations for these lines
 * + A cubic Bézier curve to approximate the rank and rating of
 *   all players in a tournamed
 * + Lines and dots to show the P2 and P3 control points for the
 *   Bézier curve
 *
 * The P2 and P3 points are interactive. For the P2 point, you
 * can only move it up and down the vertical axis on the left.
 */


import { useContext, useState } from 'react'
import { Context } from '../logic/Provider'


const COLOURS = {
  border:   "#888",
  top:      "#090",
  second:   "#c60",
  control1: "#30f",
  slope:    "#69f",
  control2: "#06d",
  curve:    "#fff9"
}

const DIMENSIONS = {
  border:  "0.25",
  grid:    "0.125",
  control: "0.25",
  slope:   "0.25",
  curve:   "0.5",
  radius:  "1"
}

const P1x = 0
const P1y = 0
const P4x = 100


export const SVG = () => {
  const {
    highest,
    lowest,
    playerCount,
    lowSeed,
    lowSeedRank,
    lastSeed,
    lastSeedRank
  } = useContext(Context)

    // Known points for seed lines
  const SLx = 100 * (lowSeedRank / playerCount)
  const SLy = 100 * (1 - lowSeed / highest)
  const SSx = 100 * (lastSeedRank / playerCount)
  const SSy = 100 * (1 - lastSeed / highest)

  // Known point for lowest rating
  const P4y = 100 * (1 - lowest / highest) // at least 100


  const [ xy, setXY ] = useState({
    // Movable control points
    P2y: 78,    // vertical position on left axis

    P3x: 55,
    P3y: 25
  })


  const startDrag = ({ target }) => {
    const { id } = target // "control1" || "slope"
    // Assume the page is not going to scroll during the
    // dragging operation.
    const svg = target.closest("svg")
    const {
      top,
      left,
      width,
      height
    } = svg.getBoundingClientRect()
    const svgWidth = svg.viewBox.baseVal.width
    const svgHeight = svg.viewBox.baseVal.height

    document.body.addEventListener("mousemove", drag)
    document.body.addEventListener("mouseup", drop)


    function drag({ clientX, clientY }) {
      const x = Math.max(
        0,
        Math.min(svgWidth * (clientX - left) / width,
        100
      ))
      const y = Math.max(
        0,
        Math.min(svgHeight * (clientY - top) / height,
        100
      ))

      if ( id === "control2" ) {
        // Need to calculate P3x and P3y from Bézier equation
        setXY({ ...xy, P3x: x, P3y: y })
      } else {
        setXY({ ...xy, P2y: y })
      }
    }

    function drop() {
      console.log("dropping")
      document.body.removeEventListener("mousemove", drag)
      document.body.removeEventListener("mouseup", drop)
    }
  }


  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="-1 -1 102 102"

      strokeWidth={`${DIMENSIONS.border}`}
      strokeLinecap="round"
      fill="none"
    >
      <style>{`
        .text { font: 2.5px sans-serif; }
      `}
      </style>

      {/* OUTLINE */}
      <rect
        x={`$P1x`}
        y={`$P1y`}
        width="100"
        height="100"
        stroke={`${COLOURS.border}`}
      />

      <g
        id="bezier"
        transform-origin="50 50"
      >
        {/* GRID */}
        <g
          strokeWidth={`${DIMENSIONS.grid}`}
        >
          {/* LOW SEED RANK... */}
          <g
            stroke={`${COLOURS.top}`}
            fill={`${COLOURS.top}`}
          >
            <line
              x1={`${SLx}`}
              y1={`$P1y`}
              x2={`${SLx}`}
              y2={`${P4x}`}
            />
             <text
               stroke="none"
               x={`${SLx - 1}`}
               y="99"
               className="text"
               transform={`rotate(-90 ${SLx - 1} 99)`}
            >
              {`Top seeds: rank from 1 to ${lowSeedRank}`}
            </text>
          {/* ... AND RATING */}
            <line
              x1={`$P1x`}
              y1={`${SLy}`}
              x2={`${P4x}`}
              y2={`${SLy}`}
            />
             <text
               stroke="none"
               x={`${SLx + 1}`}
               y={`${SLy - 1}`}
               className="text"
            >
              {`Rating from ${highest} down to ${lowSeed}`}
            </text>
          </g>
          {/* LAST SEED RANK... */}
          <g
            stroke={`${COLOURS.second}`}
            fill={`${COLOURS.second}`}
          >
            <line
              x1={`${SSx}`}
              y1={`$P1x`}
              x2={`${SSx}`}
              y2={`${P4x}`}
            />
             <text
               stroke="none"
               x={`${SSx - 1}`}
               y="99"
               className="text"
               transform={`rotate(-90 ${SSx - 1} 99)`}
            >
              {`Second seeds: rank from ${lowSeedRank} to ${lastSeedRank}`}
            </text>
          {/* ... AND RATING */}
            <line
              x1={`$P1x`}
              y1={`${SSy}`}
              x2={`${P4x}`}
              y2={`${SSy}`}
            />
             <text
               stroke="none"
               x={`${SSx + 1}`}
               y={`${SSy - 1}`}
               className="text"
            >
              {`Rating from ${lowSeed} down to ${lastSeed}`}
            </text>
          </g>
        </g>

        {/* CONTROL POINTS */}
        <g
          strokeWidth={`${DIMENSIONS.control}`}
        >
          {/* DARK BLUE VERTICAL CONTROL 1 */}
          <g
            stroke={`${COLOURS.control1}`}
            fill={`${COLOURS.control1}`}
          >
            <line
              x1={`${P1x}`}
              y1={`${P1y}`}
              x2={`${P1x}`}
              y2={`${xy.P2y}`}
            />
            <circle
              id="control1"
              cx={`${xy.P1x}`}
              cy={`${xy.P2y}`}
              r= {`${DIMENSIONS.radius}`}
              onMouseDown={startDrag}
            />
          </g>

          {/* LIGHT BLUE DIAGONAL CONTROL 2 */}
          <g
            stroke={`${COLOURS.control2}`}
            fill={`${COLOURS.slope}`}
          >
            <line
              x1={`${P4x}`}
              y1={`${P4y}`}
              x2={`${xy.P3x}`}
              y2={`${xy.P3y}`}
            />
            <circle
              id="control2"
              cx={`${xy.P3x}`}
              cy={`${xy.P3y}`}
              r= {`${DIMENSIONS.radius}`}
              onMouseDown={startDrag}
            />
          </g>
        </g>

        {/* CURVE */}
        <path
          d={`
            M ${P1x} ${P1y}
            C ${P1x} ${xy.P2y},
              ${xy.P3x * 1} ${xy.P3y},
              ${P4x} ${P4y}
          `}
          stroke={`${COLOURS.curve}`}
          strokeWidth={`${DIMENSIONS.curve}`}
        />
      </g>
    </svg>
  )
}