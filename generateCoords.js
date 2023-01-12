/* 
Length of Ships

Carrier - 5
Battleship - 4
Cruiser - 3
Submarine - 3
Destoyer - 2

*/

const shipOffsets = [
    [
        [0, 1, 2, 3, 4],
        [0, 10, 20, 30, 40],
    ],
    [
        [0, 1, 2, 3],
        [0, 10, 20, 30],
    ],
    [
        [0, 1, 2],
        [0, 10, 20], 
    ],
    [
        [0, 1, 2],
        [0, 10, 20],
    ],
    [
        [0, 1],
        [0, 10],
    ],
];

const isValidShip = (flatFleetArray, ship, origin, axis) => {
    const currentAxis = axis;
    //const shipLength = Number(ship.length);
    const start = ship[0] + origin;
    const end = ship[shipLength - 1] + origin;

    const taken = ship.some((coord) => flatFleetArray.includes(coord + origin)); // ship coords are unique to ships, not present in other ships

    /* const badHorizontal = 
        (start > 9 - shipLength && start <= 9 && end > 9) ||
        (start > 19 - shipLength && start <= 19 && end > 19) ||
        (start > 29 - shipLength && start <= 29 && end > 29) ||
        (start > 39 - shipLength && start <= 39 && end > 39) ||
        (start > 49 - shipLength && start <= 49 && end > 49) ||
        (start > 59 - shipLength && start <= 59 && end > 59) ||
        (start > 69 - shipLength && start <= 69 && end > 69) ||
        (start > 79 - shipLength && start <= 79 && end > 79) ||
        (start > 89 - shipLength && start <= 89 && end > 89);
    */
   
    const outOfBounds = 
        // added to stop horizontal coords from wrapping
        ship.some((coord) => origin + coord < 0) ||
        ship.some((coord) => origin + coord > 99);
        
    if (currentAxis === 1) {
        return !taken && !outOfBounds;
    } else {
        return !taken && !outOfBounds && !badHorizontal
    }
};

const generateFleet = () => {
    const fleetArray = [];
    const generateCoords = (offset) => {
        const validShip = [];
        const flatFleetArray = fleetArray.flat();
        const direction = Math.floor(Math.random() * 2); // 0 for horizontal, 1 for vertical
        const axisChoice = direction === 0 ? 1 : 10;
        const shipChoice = offset[direction];
        const startChoice = Math.abs(
            Math.floor(Math.random() * 100 - shipChoice.length * axisChoice)
        );

        if (isValidShip(flatFleetArray, shipChoice, startChoice, direction)) {
            shipChoice.forEach((coord) => {
                validShip.push(startChoice + coord);
            });
            fleetArray.push(validShip);
        } else {
            generateCoords(offset);
        }
    };
    generateCoords(shipOffsets[0]);
    generateCoords(shipOffsets[1]);
    generateCoords(shipOffsets[2]);
    generateCoords(shipOffsets[3]);
    generateCoords(shipOffsets[4]);
    return fleetArray;
};

module.exports = generateFleet;
module.exports = shipOffsets;
module.exports = isValidShip;