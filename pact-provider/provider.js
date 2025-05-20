const express = require("express");
const dogRepository = require("./productRepository.js");

const server = express();

server.get("/products", function (req, res) {
    console.log("Fetching...", dogRepository.fetchAll());
    res.json(dogRepository.fetchAll());
});

server.get("/products/:id", function (req, res) {
    const id = req.params.id;
    console.log("Fetching...", dogRepository.getById(id));
    res.json(dogRepository.getById(id));
});

module.exports = {
    server,
}

