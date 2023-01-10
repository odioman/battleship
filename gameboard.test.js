const Gameboard = require('./gameboard');

test('constructor converts array of coords into array of ship objects', () => {
    const board = new Gameboard([
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
    ]);
    expect(Array.isArray(board.ships)).toBe(true);
    expect(typeof board.ships[0]).toBe('object');
});

test('Ship array is same size as coords array', () => {
    const board = new Gameboard([
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
    ]);
    expect(board.ships.length).toEqual(3);
});

test('new instance of class should create a possibleMoves set with 100 values', () => {
    const board = new Gameboard([
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
    ]);
    expect(board.possibleMoves instanceof Set).toBe(true);
    expect(board.possibleMoves.size).toBe(100);
});

test('receiveAttack method should return 0 if passed a value not within possibleMoves Set', () => {
    const board = new Gameboard([
        [1, 2, 3],
        [4, 5, 6],
        [7, 11, 18],
    ]);
    expect(board.receiveAttack(100)).toBe(0);
});

test('receiveAttack method should return 1 if a valid guess is entered', () => {
    const board = new Gameboard([
        [1, 2, 3],
        [4, 5, 6],
        [7, 11, 18],
    ]);
    expect(board.receiveAttack(18)).toBe(1);
});