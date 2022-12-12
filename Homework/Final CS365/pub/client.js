var socket = io();

let myApp = Vue.createApp({
    data() {
        return {
            grid: null,
            whoseTurn: null,
            numPeople: null,
            gridSize: 6,
            largestTerritoryWhite: 0, //Here below was for the bonus
            largestTerritoryRed: 0,
            calcLargeTerritoryWhite: 0,
            calcLargeTerritoryRed: 0
        };
    },
    methods: {
        displayClassFor(val) {
            if (val == null) return "noResult";
            else if (val == 0) return "white";
            else if (val == 1) return "red";
        },
        colorSquare(x, y) {
            console.log(x + "," + y);
            //this.checkNeighbors(x, y, null); // I was trying to check the neighbors in order to count how large is the contiguous one recursively for each player
            socket.emit("colorSquare", x, y);
        },
        displayTurnFor(val) {
            if (val == 0) {
                return "White's turn";
            } else if (val == 1) {
                return "Red's turn";
            } else {
                return val;
            }
        },
        displayNumPeople(val) {
            if (!Number.isInteger(val)) {
                return val;
            } else if (val == 1) {
                return "1 person playing";
            } else {
                return val + " people playing";
            }
        },
        reset() {
            socket.emit("reset", this.gridSize);
        },
        checkNeighbors(x, y, valueToCheck) {
            //For the bonus, I was trying to see if I could do it without changing server
            let element = document.getElementById(x + "," + y);
            if (element != null) {
                console.log(element.value);
                if (valueToCheck = null) {
                    valueToCheck = element.value;
                }
                if (element.value == 0 && element.value == valueToCheck) {
                    this.calcLargeTerritoryWhite++;
                } else if (element.value == 1 && element.value == valueToCheck) {
                    this.calcLargeTerritoryRed++;
                } else {
                    if (this.calcLargeTerritoryWhite > this.largestTerritoryWhite) {
                        this.largestTerritoryWhite = this.calcLargeTerritoryWhite;
                        console.log(this.largestTerritoryWhite);
                    }
                    else if (this.calcLargeTerritoryRed > this.largestTerritoryRed) {
                        this.largestTerritoryRed = this.calcLargeTerritoryRed;
                        console.log(this.largestTerritoryRed);
                    }
                    return;
                }
                //check neighbors
                //given 0,0
                //check any positive integer result so (1,0) and (0,1) in this case and not (-1,0) and (0, -1)
                if (x == 0) {
                    this.checkNeighbors(x++, y);
                } else {
                    this.checkNeighbors(x--, y);
                    this.checkNeighbors(x++, y);
                }

                if (y == 0) {
                    this.checkNeighbors(x, y++);
                } else {
                    this.checkNeighbors(x, y--);
                    this.checkNeighbors(x, y++);
                }
            } else {
                if (this.calcLargeTerritoryWhite > this.largestTerritoryWhite) {
                    this.largestTerritoryWhite = this.calcLargeTerritoryWhite;
                    console.log(this.largestTerritoryWhite);
                }
                else if (this.calcLargeTerritoryRed > this.largestTerritoryRed) {
                    this.largestTerritoryRed = this.calcLargeTerritoryRed;
                    console.log(this.largestTerritoryRed);
                }
                return;
            }
        }
    },
    computed: {

    },
    mounted() {
        socket.on("updateUI", (grid, whoseTurn, numPeople) => {
            console.log(grid);
            console.log(whoseTurn);
            console.log(numPeople);

            this.grid = grid;
            this.whoseTurn = whoseTurn;
            this.numPeople = numPeople;
        });
        socket.on("denied", () => {
            this.whoseTurn = "Sorry! There are already two people playing";
            this.numPeople = "2 are in-game";
        });
    }
}).mount('#app');