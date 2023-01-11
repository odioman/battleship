const generateFleet = require('./generateCoords');

test('return an array', () => {
    const fleet = generateFleet();
    expect(Array.isArray(fleet)).toBe(true);
});

test('should not contain duplicates', ()=> {
    const fleet = generateFleet().flat();
    const set = new Set([...fleet]);
    expect(fleet.length).toEqual(set.size);
});
