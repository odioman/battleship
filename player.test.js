const Player = require('./player');

test('constructor should return properties with parameters', () => {
    let testPlayer = new Player([[2, 3, 6]], true);
    expect(testPlayer.turn).toBe(true);
    expect(testPlayer.board.ships.length).toEqual(1);
})

test('constructor should return correct properties with no parameters', () => {
    let testPlayer = new Player();
    expect(testPlayer.turn).toBe(false);
    expect(testPlayer.board.ships.length).toEqual(5)
})