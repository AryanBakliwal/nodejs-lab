const {sum} = require('../../src/index');

test('adds 1 + 2 to equal to 3', () => {
    expect(sum(1, 2)).toBe(3);
})