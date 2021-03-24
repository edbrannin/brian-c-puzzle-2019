const { Grid, Hex, rotate, solve } = require('src/puzzle');

const solve2 = () => {
  const answer = solve(
    Grid.rectangle({ width: 1, height: 2 }),
    {
      unusedCells: ['r'],
      init: (grid) => {
        console.log(grid)
        grid.set(0, Hex(0, 0, { doors: 'r', rotation: 0 }))
      },
    }
  )
  console.log(answer);
}

solve2();

const solve4 = () => {
const trivialCells = [
  'r',
  'r  r',
  'y  r',
  '  y',
];

const answer = solve(
  Grid.rectangle({ width: 1, height: 4 }),
  {
    unusedCells: ['r'],
    init: (grid) => {
    },
  },
);

console.log(answer);
}
