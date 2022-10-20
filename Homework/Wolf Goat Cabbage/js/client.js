let myApp = Vue.createApp({
    data() {
        return {
            crossers: [
                {
                    id: 0,
                    title: 'Wolf',
                    crossed: false,
                    image: { backgroundImage: "url(imgs/wolf.jpg)" }
                },
                {
                    id: 1,
                    title: 'Goat',
                    crossed: false,
                    image: { backgroundImage: "url(imgs/goat.jpg)" }
                },
                {
                    id: 2,
                    title: 'Cabbage',
                    crossed: false,
                    image: { backgroundImage: "url(imgs/cabbage.jpg)" }
                },
                {
                    id: 3,
                    title: 'Boat',
                    crossed: false,
                    image: { backgroundImage: "url(imgs/boatRight.jpg)" }
                }
            ]
        }
    },
    methods: {
        startDrag(evt, crosser) {
            evt.dataTransfer.dropEffect = 'move';
            evt.dataTransfer.effectAllowed = 'move';
            if (crosser.id != 3) {
                evt.dataTransfer.setData('boatID', 3);
            }
            evt.dataTransfer.setData('crosserID', crosser.id);
        },
        onDrop(evt, crossed) {
            const crosserID = evt.dataTransfer.getData('crosserID');
            if (crosserID != 3) {
                const boatID = evt.dataTransfer.getData('boatID');
                const boat = this.crossers.find((boat) => boat.id == boatID);
                boat.crossed = crossed;
            }
            const crosser = this.crossers.find((crosser) => crosser.id == crosserID);
            crosser.crossed = crossed;
            document.getElementById("left").classList.remove('leftOver');
            document.getElementById("right").classList.remove('rightOver');
        },
        onDragOver() {
            document.getElementById("left").classList.add('leftOver');
            document.getElementById("right").classList.add('rightOver');
        },
        reset() {
            document.getElementById("left").classList.remove('disabledbutton');
            document.getElementById("right").classList.remove('disabledbutton');
            this.crossers.forEach(element => {
                element.crossed = false;
            });
        }
    },
    computed: {
        notCrossed() {
            return this.crossers.filter((crosser) => crosser.crossed === false);
        },
        crossed() {
            return this.crossers.filter((crosser) => crosser.crossed === true);
        },
        win() {
            if ((this.crossers[0].crossed == false && this.crossers[1].crossed == false) && (this.crossers[3].crossed == true)) {
                //wolf & goat are on the left side, but boat is not
                console.log("Lose | wolf & goat are on the left side, but boat is not");
                loseAlert(this.crossers);
                return false;
            } else if ((this.crossers[0].crossed == true && this.crossers[1].crossed == true) && (this.crossers[3].crossed == false)) {
                //wolf & goat are on the right side, but boat is not
                console.log("Lose | wolf & goat are on the right side, but boat is not");
                loseAlert(this.crossers);
                return false;
            } else if ((this.crossers[1].crossed == false && this.crossers[2].crossed == false) && (this.crossers[3].crossed == true)) {
                //goat & cabbage are on the left side, but boat is not
                console.log("Lose | goat & cabbage are on the left side, but boat is not");
                loseAlert(this.crossers);
                return false;
            } else if ((this.crossers[1].crossed == true && this.crossers[2].crossed == true) && (this.crossers[3].crossed == false)) {
                //goat & cabbage are on the left side, but boat is not
                console.log("Lose | goat & cabbage are on the left side, but boat is not");
                loseAlert(this.crossers);
                return false;
            }
            else if (this.crossers.every(crosser => crosser.crossed === true)) {
                console.log("Win!");
                winAlert(this.crossers);
                return true;
            } else {
                return false;
            }
        }
    }
}).mount('#app');