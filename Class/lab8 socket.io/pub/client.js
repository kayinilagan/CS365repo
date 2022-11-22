var socket = io();

let myApp = Vue.createApp({
    data() {
        return { dogOffset: 0 };
    },
    methods: {
        tugLeft() { this.dogOffset -= 10; socket.emit("moveLeft"); },
        tugRight() { this.dogOffset += 10; socket.emit("moveRight"); },
        reset() { this.dogOffset = 0; socket.emit("reset"); }
    },
    computed: {
        currentDogOffset() {
            return {
                left: this.dogOffset + "px",
                right: this.dogOffset + "px"
            };
        },
    },
    mounted() {
        socket.on("updatePosition", (newOffset) => {
            this.dogOffset = newOffset;
        });
        socket.on("win", (recievedText) => {
            let text = recievedText;
            if (confirm(text)) {
                socket.emit("reset");
            } else {

            }
        })
    },
}).mount('#app');