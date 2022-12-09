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
        updateVisuals() {
            for (let i = 0; i < this.results.length; i++) {
                for (let j = 0; j < this.results.length; j++) {
                    console.log(i + "," + j);
                    let id = i + "," + j;
                    console.log(document.getElementById(id));
                    let target = document.getElementById(id);
                    if (target.value == 1) {
                        target.style.backgroundColor = rgb(0, 255, 0);
                        target.value = "Win";
                    } else if (target.value == 2) {
                        target.style.backgroundColor = rgb(255, 0, 0);
                        target.value = "Loss";
                    } else if (target.value == 3) {
                        target.value = "Draw";
                    } else {
                        target.value = "-";
                    }
                }
            }
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