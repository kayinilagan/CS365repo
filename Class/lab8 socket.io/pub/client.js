var socket = io();

let myApp = Vue.createApp({
    data() {
        return { dogOffset: 0 };
    },
    methods: {
        tugLeft() { this.dogOffset -= 10; socket.emit("moveLeft"); },
        tugRight() { this.dogOffset += 10; socket.emit("moveRight"); }
    },
    computed: {
        currentDogOffset() {
            return {
                left: this.dogOffset + "px"
            };
        }
    },
    mounted() {
        socket.on("updatePosition", (newOffset) => {
            this.dogOffset = newOffset;
        });
    },
}).mount('#app');