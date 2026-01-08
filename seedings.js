/**
 * Chess-Round-One/Project/2026/seedings.js
 * 
 * Iterates through the groups ,alternately going down and up,
 * in order to recreate the seeding order that was used by
 * Chess.com to create the groups.
 * 
 * Note that many players did not have a "chess_daily" rating, and
 * so were given an arbitrary rating:
 * 
 * - 400:  I don't know how to play
 * - 800:  I know the rules and basics
 * - 1200: I know strategies and tactics
 * - 1600: I'm a tournament player
 * 
 * (About 2200 players (4%) have ratings between 100 and 399, but
 * you can't have a rating lower than 100.)
 * 
 * These arbitrarily-rated players are distributed somewhat
 * randomly.
 */


const { readdirSync, readFileSync, writeFileSync } = require("fs")
const { join } = require('path')
const RATINGS_DIR = join(__dirname, "ratings")
const SEEDINGS = join(__dirname, "seedings.json")


// Sort...
const alphaNumeric = (a, b) => {
  a = Number(a.replace(".json", ""))
  b = Number(b.replace(".json", ""))
  return a - b
}

// ... file names in group order
const filePaths = readdirSync(RATINGS_DIR)
.filter( name => (
  name[0] !== "."
))
.sort(alphaNumeric)
.map( fileName => join(RATINGS_DIR, fileName))


// Create giant array of arrays, containing all groups
const groups = filePaths.map( filePath => (
  require(filePath)
))


const seedings = []
const last = filePaths.length - 1
let down = true // start moving down from 0 -> last


// Use a label, to break out of the inner loop
groups: for ( let ii = 0; ii < 12; ii += 1 ) {
  for ( let jj = 0; jj <= last; jj += 1 ) {
    const index = (down)
      ? jj        // 0 --> last
      : last - jj // last --> 0

    const player = groups[index][ii]
    if (!player) {
      break groups
    }
    seedings.push(player)
  }

  // Switch between moving down and up for the next iteration
  down = !down
}



const content = JSON.stringify(seedings)
writeFileSync(SEEDINGS, content, { encoding: "utf8" })
