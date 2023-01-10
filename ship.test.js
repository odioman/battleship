const Ship = require('./ship');

test('length is equal to value entered to constructor', () => {
    const ship = new Ship(4);
    expect(ship.length).toBe(4)
});

test('calling hit() should increase hits value', () => {
    const ship = new Ship(4);
    ship.hit();
    expect(ship.hits).toBe(1);
});

test('isSunk() should return false if hits is below length value', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
});

test('isSunk should return true if hits equal to length value', () => {
    const ship = new Ship(5);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test('coords should return an array if entered into constructor', () => {
    const ship = new Ship(5, [1,2,3,4,5]);
    expect(ship.coords).toEqual([1,2,3,4,5])
})
