const express = require("express");

const server = express();

server.get("/dogs", function (req, res) {
  res.json([
    {
      dog: 1,
    },
  ]);
});

// (1) Start provider locally. Be sure to stub out any external dependencies
server.listen(8081, () => {
  //   importData();
  console.log("Animal Profile Service listening on http://localhost:8081");
});
