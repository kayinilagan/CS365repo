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
            if (column == row) {
                return;
            }
            socket.emit("changeResult", column, row)
        },
        displayResultFor(val) {
            if (val == 1) return "Win";
            else if (val == 2) return "Loss";
            else if (val == 3) return "Draw";
            else return "NA";
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
            //this.updateVisuals();
        });
    }
}).mount('#app');