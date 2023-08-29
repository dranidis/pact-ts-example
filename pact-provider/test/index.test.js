const { describe, it } = require("mocha");
const { Verifier } = require("@pact-foundation/pact");
const path = require("path");

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
    })
      .verifyProvider()
      .then(() => {
        console.log("Pact Verification Complete!");
      });
  });
});
