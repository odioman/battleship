class Ship {
    hits = 0;
    constructor(length, array = null) {
        this.length = length;
        if (array) this.coords = [...array];
    }

    hit() {
        this.hits++
    }

    isSunk() {
        return this.hits >= this.length
    }
}

module.exports = Ship; 



