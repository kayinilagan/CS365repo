var express = require("express");
var server = express();
bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/numberOfCandidates", function (req, res) {
    res.set("Content-Type", "text/html; charset=UTF-8"); //Tells the browser what kind of content this will be
    res.set("Cache-Control", "no-cache");  //Tells the browser: "don't use a cached response; ask the server every time".
    res.write("My estimate is " + 100 * Math.random()); //sends this text as a response to the client
    res.end(); //done with the response to the client

    for (person in voteTotals) {

    }
});

server.use(express.static("./pub"));
let voteTotals = {}; //empty object

server.post("/vote", function (req, res) {
    //Establish the variable for this candidate, if needed, then increment their total.
    if (!voteTotals[req.body.candidate]) voteTotals[req.body.candidate] = 0;
    voteTotals[req.body.candidate]++;

    //Print out all the candidates' totals.
    for (person in voteTotals) {
        res.write(person + " has " + voteTotals[person] + "\n");
    }
    res.end();
});

server.listen(80, function () {
    console.log("Server is now running on port 80."); //This callback happens once the server is ready.
});