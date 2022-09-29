let myApp = Vue.createApp({
    data() {
        return {
            cup3: 0,
            cup5: 0,
            moveList: []
        };
    },
    methods: {
        fill3CupFromVat: function (event) {
            this.cup3 = 3;
            this.moveList.push({ text: "Vat -> 3", id: Symbol() });
            console.log("----");
            console.log(this.cup3);
            console.log(this.cup5);
        },
        fill5CupFromVat: function (event) {
            this.cup5 = 5;
            this.moveList.push({ text: "Vat -> 5", id: Symbol() });
            console.log("----");
            console.log(this.cup3);
            console.log(this.cup5);
        },
        dump3toVat: function (event) {
            this.cup3 = 0;
            this.moveList.push({ text: "3 -> Vat", id: Symbol() });
            console.log("----");
            console.log(this.cup3);
            console.log(this.cup5);
        },
        dump5toVat: function (event) {
            this.cup5 = 0;
            this.moveList.push({ text: "5 -> Vat", id: Symbol() });
            console.log("----");
            console.log(this.cup3);
            console.log(this.cup5);
        },
        pour3to5: function (event) {
            this.cup5 += this.cup3;
            if (this.cup5 > 5) {
                this.cup3 = this.cup5 - 5;
                this.cup5 = 5;
            } else {
                this.cup3 = 0;
            }
            this.moveList.push({ text: "3 -> 5", id: Symbol() });
            console.log("----");
            console.log(this.cup3);
            console.log(this.cup5);
        },
        pour5to3: function (event) {
            this.cup3 += this.cup5;
            if (this.cup3 > 3) {
                this.cup5 = this.cup3 - 3;
                this.cup3 = 3;
            } else {
                this.cup5 = 0;
            }
            this.moveList.push({ text: "5 -> 3", id: Symbol() });
            console.log("----");
            console.log(this.cup3);
            console.log(this.cup5);
        },
        reset: function (event) {
            this.cup3 = 0;
            this.cup5 = 0;
            this.moveList = [];
        }
    },
    computed: {
        message: function () {
            if (this.cup5 == 4) {
                return "Congratulations you've won the game!";
            } else if (this.cup3 != 0 || this.cup5 != 0) {
                return "Cup 3 is currently at: " + this.cup3 + " | Cup 5 is currently at: " + this.cup5;
            } else {
                return "Welcome to the Game! Your objective is to get Cup 5 to have 4 levels.";
            }
        }
    }
}).mount('#app');