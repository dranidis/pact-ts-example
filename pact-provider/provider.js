const express = require("express");
const dogRepository = require("./dogRepository.js");

const server = express();

server.get("/dogs", function (req, res) {
    console.log("Fetching...", dogRepository.fetchAll());
    res.json(dogRepository.fetchAll());
});

module.exports = {
    server,
}

