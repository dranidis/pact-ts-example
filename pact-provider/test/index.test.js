const { describe, it } = require("mocha");
const { Verifier } = require("@pact-foundation/pact");
const { versionFromGitTag } = require('absolute-version');

const path = require("path");
const dogRepository = require("../dogRepository.js");

const { server } = require("../provider.js");

console.log("DD", versionFromGitTag());

const app = server.listen(8081, () => {
  console.log('Animal Profile Service listening on http://localhost:8081');
});

// (2) Verify that the provider meets all consumer expectations
describe("Pact Verification", () => {
  it("validates the expectations of Matching Service", () => {
    return new Verifier({
      provider: 'MyProvider',

      providerBaseUrl: "http://localhost:8081", // <- location of your running provider

      // Fetch pacts from broker
      pactBrokerUrl: 'http://localhost:9292/',
            // If you're using the open source Pact Broker, use the username/password option as per below
      // pactBrokerUsername: "",
      // pactBrokerPassword: "",

      // Fetch from broker with given tags
      // consumerVersionTags: ['master', 'test', 'prod', 'feat/v3.0.0'],

      // Tag provider version with given tags
      // providerVersionBranch: process.env.GIT_BRANCH || 'master',
      publishVerificationResult: true,
      providerVersionBranch: 'master',
      providerVersion: process.env.GIT_COMMIT || versionFromGitTag(),

      // Find _all_ pacts that match the current provider branch
      consumerVersionSelectors: [
        {
          matchingBranch: true,
        },
        {
          mainBranch: true,
        },
        {
          deployedOrReleased: true,
        },
      ],

      // Enables "pending pacts" feature
      enablePending: true,

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
