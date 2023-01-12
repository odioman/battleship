const Gameboard = require('./gameboard');
const generateFleet = require('./generateCoords');
const aiMove = require('./aiLogic');

class Player {
    constructor(shipArray = generateFleet(), turn = false) {
        this.board = new Gameboard(shipArray);
        this.turn = turn;
    }
    changeTurn() {
        this.turn = !this.turn;
    }
    attack(enemyBoard, coord = null) {
        if (!this.turn) return;
        if (Number.isInteger(coord)) return enemyBoard.receiveAttack(coord);
        if (coord === null) return enemyBoard.receiveAttack(aiMove(enemyBoard));
    }
}

module.exports = Player;