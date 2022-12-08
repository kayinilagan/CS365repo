var express = require("express");
var app = express();
var http = require("http");
var server = http.Server(app);
var socketio = require("socket.io");
var io = socketio(server);
app.use(express.static("pub"));

const BLANK = 0;
const WIN = 1;
const LOSE = 2;
const DRAW = 3;

let results;
let teamNames;
resetTournament(4);

function resetTournament(size) {
	teamNames = Array(size);
	for(var i = 0; i < size; i++) {
		teamNames[i] = "Player #"+i;
	}

	results = [];
	for(var i = 0; i < size; i++) {
		results[i] = Array(size);
		for(var j = 0; j < size; j++) {
			results[i][j] = 0;
		}
	}
}

function getRankings() {
	let rankings = [];
	for(let i = 0; i < teamNames.length; i++) {
		rankings[i] = {
			teamName: teamNames[i],
			wins: results[i].filter(r => r==WIN).length,
			losses: results[i].filter(r => r==LOSE).length,
			draws: results[i].filter(r => r==DRAW).length
		};
	}
	rankings.sort((a,b) => b.wins-b.losses - (a.wins-a.losses)); //sort best team first.
	return rankings;
}

function isNumeric(obj) {
	return !isNaN( parseFloat(obj) ) && isFinite( obj );
}

function isInteger(obj) {
	return isNumeric(obj) && parseFloat(obj) % 1 == 0;
}

function isIntegerInRange(obj, low, high) {
	return isInteger(obj) && obj >= low && obj <= high;
}

function reverseOf(result) {
	if (result==BLANK) return BLANK;
	if (result==WIN) return LOSE; //if win then lose
	if (result==LOSE) return WIN; //if lose then win
	if (result==DRAW) return DRAW; //if draw then draw
	throw new Error("Bad result value: " + result);
}


io.on("connection", function(socket) {
	socket.emit("updateResults", results, teamNames, getRankings());

	socket.on("changeResult", function(row, column) {
		if (isIntegerInRange(row, 0, teamNames.length-1) && isIntegerInRange(column, 0, teamNames.length-1)) {
			results[row][column] = (results[row][column] + 1) % 4; //cycle it.
			if (row != column) results[column][row] = reverseOf(results[row][column]); //correponding result across the diagonal
			io.emit("updateResults", results, teamNames, getRankings());
		}
	});

	socket.on("reset", function(numberOfTeams) {
		if (isIntegerInRange(numberOfTeams, 2, 20)) {
			resetTournament(numberOfTeams);
			io.emit("updateResults", results, teamNames, getRankings());
		}
	});

	socket.on("setTeamName", function(index, teamName) {
		if (isIntegerInRange(index, 0, teamNames.length-1)) {
			teamNames[index] = teamName;
			io.emit("updateResults", results, teamNames, getRankings());
		}
	});


});

server.listen(80, function() {
	console.log("Server with socket.io is ready.");
});

