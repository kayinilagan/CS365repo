//This part is the same as usual...
const e = require("express");
var express = require("express");
var app = express();

var http = require("http");

//We are getting an instance of a Node HTTP (web) server here.
//We are also telling it to connect up with our Express application,
//so it can handle requests.
var server = http.Server(app);

//On command prompt, we need to do "npm install socket.io"
var socketio = require("socket.io");

//instantiates our 'io' instance, and also connects it up with the HTTP
//server we already created.
var io = socketio(server);

//Just for static files (like usual).  Eg. index.html, client.js, etc.
app.use(express.static("pub"));

server.listen(80, function () {
	let dogOffset = 0; //the "official" record of where the dogs are located

	function updateOffset(offset) {
		if (offset == 0) {
			dogOffset = 0;
		} else {
			dogOffset += offset;
		}
		if (dogOffset == 60) {
			io.emit("win", "Right wins!");
		} else if (dogOffset == -60) {
			io.emit("win", "Left wins!");
		} else {
			console.log("Position is now " + dogOffset);
			io.emit("updatePosition", dogOffset); //telling all the clients the new position.
		}
	}

	io.on("connection", (socket) => {
		console.log("Somebody connected.");

		socket.emit("updatePosition", dogOffset);

		socket.on("disconnect", () => {
			console.log("Somebody disconnected.");
		});

		//This gets called when a client emits a "moveLeft" message
		socket.on("moveLeft", () => {
			updateOffset(-5);
		});

		//Any other messages such as "moveRight" will be handled here similarly
		socket.on("moveRight", () => {
			updateOffset(5);
		});

		socket.on("reset", () => {
			updateOffset(0);
		});

	});
});



