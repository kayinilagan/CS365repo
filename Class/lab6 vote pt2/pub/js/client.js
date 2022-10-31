let myApp = Vue.createApp({
    data() {
        return { feedback: "Hello, World", candidateVote: "" };
    },
    methods: {
        fetchNumCandidates() {
            fetch("/numberOfCandidates").then( //Makes a GET request to /numberOfCandidates
                (result) => {
                    if (!result.ok) throw new Error("status: " + result.status); //Throw error if not status code 200 through 299.
                    return result.text(); //returns the result as the next promise to the "then" below
                }
            ).then(
                (data) => { //This 'data' parameter is the text data sent from the server, returned from the 'then' above.
                    this.feedback = data;
                },
                (err) => {
                    this.feedback = "Error: " + err.message;
                }
            );
        },
        recordVote() {
            let params = new URLSearchParams();
            params.append("candidate", this.candidate);
            fetch("/vote", { method: 'POST', body: params }).then(
                (result) => {
                    if (!result.ok) throw new Error("status: " + result.status);
                    return result.text();
                }
            ).then(
                (data) => {
                    this.feedback = data;
                },
                (err) => {
                    this.feedback = "Error: " + err.message;
                }
            );
        },
        voteTotalFor() {
            let params = new URLSearchParams();
            params.append("candidateVote", this.candidateVote);
            fetch("voteTotalFor?" + params).then(
                (result) => {
                    if (!result.ok) throw new Error("status: " + result.status);
                    return result.text();
                }
            ).then(
                (data) => {
                    this.feedback = data;
                },
                (err) => {
                    this.feedback = "Error: " + err.message;
                }
            )
        },
        reset() {
            let params = new URLSearchParams();
            params.append("password", document.getElementById("password").value);
            fetch("/reset", { method: 'POST', body: params }).then(
                (result) => {
                    if (!result.ok) throw new Error("status: " + result.status);
                    return result.text();
                }
            ).then(
                (data) => {
                    this.feedback = data;
                },
                (err) => {
                    this.feedback = "Error: " + err.message;
                }
            );
        },
        getTotalVotes() {
            fetch("/getTotalVotes").then(
                (result) => {
                    if (!result.ok) throw new Error("status: " + result.status); //Throw error if not status code 200 through 299.
                    return result.text(); //returns the result as the next promise to the "then" below
                }
            ).then(
                (data) => { //This 'data' parameter is the text data sent from the server, returned from the 'then' above.
                    this.feedback = data;
                },
                (err) => {
                    this.feedback = "Error: " + err.message;
                }
            );
        },
    },
    computed: {

    },
    mounted() {

    },
}).mount("#app");