const { Grid, Hex, rotate, makeHex, place } = require('./puzzle');

describe('rotate', () => {
  it('should expand too-short strings', () => {
    expect(rotate('r')).toBe('r     ');
  })

  it('should rotate strings (colors)', () => {
    expect(rotate('r', 1)).toBe('     r');
  })

  it('should rotate strings (numbers)', () => {
    expect(rotate('123456', 1)).toBe('234561');
  })

  it('should die on too-long strings', () => {
    expect(() => rotate('1234567')).toThrow('TOO MANY DOORS');
  })

})

describe.only('place()', () => {
  it('should add a hex to the grid', () => {
    const g = Grid.rectangle({ width: 1, height: 2 });
    place(g, makeHex(0, 0, 'r'));
    console.log(g)
    expect(g.get([0, 0]).doors).toBe('r     ');
  })

  it('should fail if the new hex has external doors', () => {
    const g = Grid.rectangle({ width: 1, height: 2 });
    expect(() => place(g, makeHex(0, 0, 'rrrrrr'))).toThrow('External door');
  })
})

describe.skip('openDoors', () => {
  it('should list open doors', () => {
    const g = Grid.rectangle({ width: 1, height: 2 });
    g.set(0, makeHex(0, 0, 'r'))
    const answer = openDoors(g);
    expect(answer).toHaveLength(1);
    expect(answer).toContainEqual({ x: 0, y: 1, doors: '  r   ' });
  })
})