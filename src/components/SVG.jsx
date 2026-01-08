/**
 * src/components/SVG.jsx
 */


import { useContext } from 'react'
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


  const xy = {
    Mx: 0,      // fixed
    My: 0,      // fixed
    Nx: 100,    // fixed
    Ny: 100 * (1 - lowest / highest), // at least 100

    Ax: 0,      // fixed
    Ay: 39,     // vertical position on left axis
    By: 25,
    Ox: 45,     // horizontal position on top axis < 100
    get slope() {
      return this.Ny / (100 - this.Ox) // this.Ox < 100
    },
    get Bx() {
      return (this.By / this.slope) + this.Ox
    },
    r:  DIMENSIONS.radius, // arbitrary

    Lx: 100 * (lowSeedRank / playerCount),
    Ly: 100 * (1 - lowSeed / highest),
    Sx: 100 * (lastSeedRank / playerCount),
    Sy: 100 * (1 - lastSeed / highest),
  }

  console.log("Ox:", xy.Ox, "Ny", xy.Ny, "slope:", xy.slope, "Bx", xy.Bx)


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
        x="0"
        y="0"
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
              x1={`${xy.Lx}`}
              y1="0"
              x2={`${xy.Lx}`}
              y2="100"
            />
             <text
               stroke="none"
               x={`${xy.Lx - 1}`}
               y="99"
               className="text"
               transform={`rotate(-90 ${xy.Lx - 1} 99)`}
            >
              {`Top seeds: rank from 1 to ${lowSeedRank}`}
            </text>
          {/* ... AND RATING */}
            <line
              x1="0"
              y1={`${xy.Ly}`}
              x2="100"
              y2={`${xy.Ly}`}
            />
             <text
               stroke="none"
               x={`${xy.Lx + 1}`}
               y={`${xy.Ly - 1}`}
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
              x1={`${xy.Sx}`}
              y1="0"
              x2={`${xy.Sx}`}
              y2="100"
            />
             <text
               stroke="none"
               x={`${xy.Sx - 1}`}
               y="99"
               className="text"
               transform={`rotate(-90 ${xy.Sx - 1} 99)`}
            >
              {`Second seeds: rank from ${lowSeedRank} to ${lastSeedRank}`}
            </text>
          {/* ... AND RATING */}
            <line
              x1="0"
              y1={`${xy.Sy}`}
              x2="100"
              y2={`${xy.Sy}`}
            />
             <text
               stroke="none"
               x={`${xy.Sx + 1}`}
               y={`${xy.Sy - 1}`}
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
              x1={`${xy.Mx}`}
              y1={`${xy.My}`}
              x2={`${xy.Ax}`}
              y2={`${xy.Ay}`}
            />
            <circle
              id="control1"
              cx={`${xy.Ax}`}
              cy={`${xy.Ay}`}
              r= {`${xy.r}`}
            />
          </g>
          
        
          {/* LIGHT HORIZONTAL SLOPE CONTROL*/}
          <g
            stroke={`${COLOURS.slope}`}
            fill={`${COLOURS.control2}`}
            strokeWidth={`${DIMENSIONS.slope}`}
            strokeDasharray="1, 1"
          >
            <line
              x1={`${xy.Ox}`}
              y1="0"
              x2={`${xy.Bx}`}
              y2={`${xy.By}`}
            />
            <circle
              id="control2"
              cx={`${xy.Ox}`}
              cy="0"
              r= {`${xy.r}`}
              stroke="none"
            />
          </g>
          
          {/* LIGHT BLUE PUPPET CONTROL 2 */}
          <g
            stroke={`${COLOURS.control2}`}
            fill={`${COLOURS.slope}`}
          >
            <line
              x1={`${xy.Nx}`}
              y1={`${xy.Ny}`}
              x2={`${xy.Bx}`}
              y2={`${xy.By}`}
            />
            <circle
              id="control2"
              cx={`${xy.Bx}`}
              cy={`${xy.By}`}
              r= {`${xy.r}`}
            />
          </g>
        </g>

        {/* CURVE */}
        <path
          d={`
            M ${xy.Mx} ${xy.My}
            C ${xy.Ax} ${xy.Ay * 2},
              ${xy.Bx * 1} ${xy.By * 1},
              ${xy.Nx} ${xy.Ny}
          `}
          stroke={`${COLOURS.curve}`}
          strokeWidth={`${DIMENSIONS.curve}`}
        />
      </g>
    </svg>
  )
}