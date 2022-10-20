let myApp = Vue.createApp({
    data() { },
    methods: {
        dragStart(e) {
            e.dataTransfer.setData('text/plain', e.target.id);
            console.log("dragStart");
        },
        dragEnter(e) {
            console.log("dragenter");
        },
        dragOver(e) {
            console.log("dragOver");
        },
        dragLeave(e) {
            console.log("dragLeave");
        },
        dragExit(e) {
            console.log("dragExit");
        },
        drop(e) {
            console.log("drop");
            const id = e.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(id);
            this.target.appendChild(draggable);
        }
    },
    computed: {}
}).mount('#app');