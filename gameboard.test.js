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

test('receiveAttack called with a valid hit or miss should increment the hits/misses array', () => {
    const board = new Gameboard([
        [1, 2, 3],
        [4, 5, 6],
        [7, 11, 18],
    ]);
    board.receiveAttack(7);
    board.receiveAttack(18);
    board.receiveAttack(77);
    board.receiveAttack(89);
    expect(board.hitsArray[0]).toBe(7);
    expect(board.hitsArray[1]).toBe(18);
    expect(board.missesArray[0]).toBe(77);
    expect(board.missesArray[1]).toBe(89);
    expect(board.missesArray[1]).toBe(89);
    expect(board.missesArray[2]).toBe(undefined);
});

test('receiveAttack should only accept a valid move once, it should then be removed from the set', ()=> {
    const board = new Gameboard([
        [1, 2, 3],
        [4, 5, 6],
        [7, 11, 18],
    ]);
    expect(board.possibleMoves.size).toBe(100)
    board.receiveAttack(88);
    board.receiveAttack(88);
    expect(board.missesArray[0]).toBe(88);
    expect(board.missesArray[1]).toBe(undefined);
    expect(board.receiveAttack(88)).toBe(0);
    expect(board.possibleMoves.has(88)).toBe(false);
    expect(board.possibleMoves.size).toBe(99);
})

test('checkForWin method should return false if all ships are not sunk', () => {
    const board = new Gameboard([
        [1, 8, 9],
        [10, 12, 14],
        [18, 19, 22],
    ]);
    board.receiveAttack(1);
    board.receiveAttack(8);
    board.receiveAttack(9);
    board.receiveAttack(10);
    board.receiveAttack(12);
    board.receiveAttack(14);
    expect(board.checkForWin()).toBe(false)
});

test('checkForWin method should return true if all ships are sunk', () => {
    const board = new Gameboard([
        [1, 8, 9],
        [10, 12, 14],
        [18, 19, 22],
    ]);
    board.receiveAttack(1);
    board.receiveAttack(8);
    board.receiveAttack(9);
    board.receiveAttack(10);
    board.receiveAttack(12);
    board.receiveAttack(14);
    board.receiveAttack(18);
    board.receiveAttack(19);
    board.receiveAttack(22);
    expect(board.possibleMoves.size).toBe(91);
    expect(board.checkForWin()).toBe(true);
});

test('getShipCoords should return flat array of all ship coords passed to constructor', () => {
    const board = new Gameboard([
        [1, 8, 9],
        [10, 12, 14],
        [18, 19, 22],
    ]);

    const flatBoard = board.getShipCoords();
    expect(flatBoard).toStrictEqual([1, 8, 9, 10, 12, 14, 18, 19, 22]);
});