const _ = require('lodash');
const Honeycomb = require('honeycomb-grid');
const xor = require('xor-js');

const Grid = Honeycomb.defineGrid()
const { Hex } = Grid;
// Grid.hexagon({ radius: 1, })

const getGrid = grid => {
  if (typeof grid === 'string') {
    return JSON.parse(grid)
  }
  return grid
}

const place = (grid, hex) => {
  grid.set([hex.x, hex.y], hex)
  console.log('Grid', grid)

  console.log('Hex', grid.get([hex.x, hex.y]))

  const neighbors = grid.neighborsOf(hex);
  console.log('Neighbors', neighbors);

  const doors = hex.doors.split('');
  const zipped = _.zip(neighbors, doors).filter((items) => xor(...items))
  console.log('zipped', zipped);

}

const openDoors = grid => {
  grid.filter(({ placed, doors }) => doors && !placed)
}

const solve = (theGrid, { unusedCells, state, init }) => {
  const grid = getGrid(theGrid);
  if (init) {
    init(grid);
  }
  grid.forEach(cell => console.log(cell));

  console.log(grid);
  console.log(unusedCells);
}

const rotate = (doors, rotation=0) => {
  if (doors.length > 6) {
    throw new Error('TOO MANY DOORS');
  }

  if (doors.length !== 6) {
    return rotate(_.padEnd(doors, 6), rotation)
  }

  let answer = doors;
  let rotationLeft = rotation;
  while (rotationLeft > 0) {
    answer = answer.slice(1) + answer[0]
    rotationLeft -= 1;
  }
  return answer;
}

const makeHex = (x, y, doors, rotation = 0) => Hex(0, 0, { doors: rotate(doors), rotation });

module.exports = {
  Grid,
  Hex,
  rotate,
  solve,
  makeHex,
  openDoors,
  place,
}