const { describe, it } = require("mocha");
const { Verifier } = require("@pact-foundation/pact");
const path = require("path");
const dogRepository = require("../dogRepository.js");

const { server } = require("../provider.js");

// (1) Start provider locally. Be sure to stub out any external dependencies
server.listen(8081, () => {
  //   importData();
  console.log("Animal Profile Service listening on http://localhost:8081");
});

console.log("REPO", dogRepository);

const app = server.listen(8081, () => {
  importData();
  console.log('Animal Profile Service listening on http://localhost:8081');
});

// (2) Verify that the provider meets all consumer expectations
describe("Pact Verification", () => {
  it("validates the expectations of Matching Service", () => {
    return new Verifier({
      providerBaseUrl: "http://localhost:8081", // <- location of your running provider
      pactUrls: [
        path.resolve(
          process.cwd(),
          "../pacts/MyConsumer-MyProvider.json"
        ),
      ],
      stateHandlers: {
        "I have a non-empty list of dogs": () => {
          dogRepository.insert({ id: 1, name: "Fido" });
          console.log("🎃 REPO", dogRepository);
          return Promise.resolve({
            description: `A dog was added to the db`
          });
        }
      }
    })
      .verifyProvider()
      .then(() => {
        console.log("Pact Verification Complete!");
      });
  });
});
