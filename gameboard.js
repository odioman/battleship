const Ship = require('./ship')

class Gameboard{
    possibleMoves = new Set(...[this.createMoves()]);
    hitsArray = [];
    missesArray = [];
    constructor(shipArray) {
        this.ships = this.createShips(shipArray)
    }

    createMoves(width = 10) {
        let moveList = [];
        for (let i = 0; i < width * width; i++) {
            moveList.push(i);
        }
        return moveList;
    }

    createShips(shipArray) {
        return shipArray.map((ship) => {
            return new Ship(ship.length, [...ship]);
        });
    }

    receiveAttack(guess) {
        if (!this.possibleMoves.has(guess)) {
            return 0;
        } else {
            this.possibleMoves.delete(guess);
            this.handleHitOrMiss(guess);
            return 1;
        }
    }

    handleHitOrMiss(validMove) {
        this.ships.forEach((ship) => {
            if (ship.coords.includes(validMove)) {
                ship.hit();
                this.hitsArray.push(validMove)
            }
        });

        const flatShipCoords = this.getShipCoords();
        if (!flatShipCoords.includes(validMove)) {
            this.missesArray.push(validMove);
        }
    }

    getShipCoords() {
        return this.ships.map((ship) => ship.coords).flat()
    }

    checkForWin() {
        return (this.ships.filter((ship) => ship.isSunk()).length === this.ships.length);
    }

    hasCausedSinking(coord) {
        const flatSunkShipsArray = this.ships
            .filter((ship) => ship.isSunk())
            .map((ship) => ship.coords)
            .flat();
        return flatSunkShipsArray.includes(coord);
    }

    getSunkCoords(coord) {
        return this.ships
            .filter((ship) => ship.isSunk() && ship.coords.includes(coord))
            .map((ship) => ship.coords)
            .flat();
    }
}

module.exports = Gameboard;