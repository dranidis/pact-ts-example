const { describe, it } = require("mocha");
const { Verifier } = require("@pact-foundation/pact");
const path = require("path");
const dogRepository = require("../dogRepository.js");

const { server } = require("../provider.js");

const app = server.listen(8081, () => {
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
          dogRepository.clearAll();
          
          dogRepository.insert({ id: 11, name: "Fido", age: 3 });
          // dogRepository.insert({ id: 12, name: "Ada", age: 3 });
          // dogRepository.insert({ id: 11, age: 3 });
          // dogRepository.insert({ id: 11, name: {s: "Ida"}, age: 3 });
          // dogRepository.insert({ id: 11, name: 3, age: 3 });

          console.log("REPO", dogRepository);
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
