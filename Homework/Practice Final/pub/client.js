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
        setTeamName(index) {
            console.log("Got called with index" + index);
            let teamName = document.getElementById(index).value;
            socket.emit("setTeamName", index, teamName);
        },
        reset() {
            let numberOfTeams = document.getElementById("numOfPlayers").value;
            socket.emit("reset", numberOfTeams);
        },
        changeResult(column, row) {
            console.log(column + "," + row);
            socket.emit("changeResult", row, column)
        }
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