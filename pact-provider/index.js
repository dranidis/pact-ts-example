
const { server } = require("./provider.js");

server.listen(8081, () => {
  console.log("Provider listening on http://localhost:8081");
});
