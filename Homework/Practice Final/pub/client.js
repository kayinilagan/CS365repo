var socket = io();

let myApp = Vue.createApp({
    data() {
        return {
            results: null,
            teamNames: null,
            rankings: null
        };
    },
    methods: {

    },
    computed: {

    },
    mounted() {
        socket.on("updateResults", (results, teamNames, rankings) => {
            console.log(results);
            console.log(teamNames);
            console.log(rankings);

            this.results = results;
            this.teamNames = teamNames;
            this.rankings = rankings;
        });
    }
}).mount('#app');