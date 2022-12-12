// Set up express, socket.io, and http.
var express = require("express");
var app = express();
var http = require('http');
var server = http.Server(app);
var socketIO = require("socket.io");
var io = socketIO(server);
app.use(express.static("pub"));

//Initialize global variables
var bothSockets = [null, null]; //An array of two players, represented as socket objects; null means no player in that seat.
var whoseTurn = 0; //The player that gets to go next.
var grid; //2D array representing the state of the board.

//Set up grid.  null means nobody owns that square.  Otherwise an integer indicates who owns it.
function resetGrid(size) {
	grid = [];
	for(var y = 0; y < size; y++) {
		grid[y] = [];
		for(var x = 0; x < size; x++) {
			grid[y][x] = null;
		}
	}
}

//Sends the updated game state to actively playing clients (grid, whoseTurn, and numPeople).
function sendState() {
	//Figure out how many people are playing (0, 1, or 2).
	var numPeople = 0;
	if (bothSockets[0] != null) numPeople++;
	if (bothSockets[1] != null) numPeople++;

	//Send it to clients that are connected and playing.  Other sockets may be connected, but we only talk to the active players.
	for(let i = 0; i < bothSockets.length; i++) {
		if (bothSockets[i] != null) bothSockets[i].emit('updateUI', grid, whoseTurn, numPeople);
	}
}

//Main program now...
resetGrid(6); //default to a size-6 grid

io.on("connection", function(socket) {
	//Find a seat that is available.  If both are full, send a rejection message to the client.
	var seatNumber = null;
	if (bothSockets[0]==null) {
		seatNumber = 0;
	}
	else if (bothSockets[1]==null) {
		seatNumber = 1;
	}
	else {
		socket.emit('denied');
		console.log("Someone just connected to the server, but the room is full.");
	}

	//If they got a seat, store their socket and allow them to reset the game and play a square
	if (seatNumber != null) {
		//Put the client in their seat
		console.log("Someone just connected to the server and is now in seat #" + seatNumber);
		bothSockets[seatNumber] = socket;
		sendState(); //Update everyone since someone just joined in

		//If they obtained a seat, make it so they can request a reset of the game.
		socket.on("reset", function(size) {
			size = parseFloat(size);
			if (!Number.isInteger(size) || !Number.isFinite(size) || size < 1) return;
			resetGrid(size);
			sendState();
		});

		//Called by a client to claim a blank square.  Parameters are x and y coordinates (0 up to size-1).
		//If the move is valid, then the server sends an 'updateUI' event to all connected clients.
		socket.on("colorSquare", function(x,y) {
			var i = bothSockets.indexOf(socket);
			if (whoseTurn != i) return; //Only seated players can play, and only on their turn.

			//Input validation.  Don't accept coordinates that are out of range
			if (!Number.isInteger(y) || y < 0 || y >= grid.length) return;
			if (!Number.isInteger(x) || x < 0 || x >= grid[0].length) return;

			if (grid[y][x] != null) return; //Don't let them play somewhere that's already taken.

			grid[y][x] = whoseTurn; //Claim the square.
			whoseTurn = 1 - whoseTurn; //Toggle who's turn it is.

			sendState();
		});
	}

	//Handles a client disconnecting gracefully (vacating their game seat).
	socket.on("disconnect", function() {
		var i = bothSockets.indexOf(socket); //find out where this socket is in the array.
		if (i == 0 || i == 1) {
			bothSockets[i] = null;
			console.log("A player disconnected and left seat " + i);
			sendState();
		}
		else {
			console.log("An unseated client disconnected");
		}
	});

});

//Start the HTTP server
server.listen(80, function() {
	console.log("Game server is ready");
});