const cluster = require('cluster');

if (cluster.isMaster) {

    // Parallelism can be configured through env params
    var cpuCount = process.env.PARALLELISM || 2;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
    const express = require("express");
    const app = express();
    const port = 9595

    var server = app.listen(port, () => {
        console.log("Server running on port " + port);
    });

    server.on('connection', function(socket) {
        //Below line has been added to check how many new connections are being made. This should be very few in a keep alive env
        console.log("New connection was made by client");
        socket.setTimeout(180 * 1000); 
    });

    app.get("/", (req, res, next) => {
        res.status(200).send('hello');
    });

    app.get("/:reqpath", (req, res, next) => {
        let reqpath = req.params.reqpath;
        res.status(200).send(reqpath);
    });

    app.get("/service/health", (req, res, next) => {
        res.status(200).send('{"healthy":true}');
    });

    app.use(function (req,res,next){
        res.status(200).send('Unknown Path');
    });
    
}