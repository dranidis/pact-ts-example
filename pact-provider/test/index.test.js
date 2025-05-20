const { describe, it } = require("mocha");
const { Verifier } = require("@pact-foundation/pact");

const productRepository = require("../productRepository.js");
const { server } = require("../provider.js");

const app = server.listen(8081, () => {
  console.log('Animal Profile Service listening on http://localhost:8081');
});

describe("Pact Verification", () => {
  it("validates the expectations of Matching Service", () => {
    return new Verifier({
      provider: 'ProductsAPI',
      providerBaseUrl: "http://localhost:8081", // <- location of your running provider

      // Fetch pacts from broker
      pactBrokerUrl: 'http://localhost:9292/',
      // pactBrokerUsername: process.env.GIT_BRANCH.PACT_BROKER_USERNAME,
      // pactBrokerPassword: process.env.GIT_BRANCH.PACT_BROKER_PASSWORD,

      publishVerificationResult: true,
      providerVersionBranch: process.env.GIT_BRANCH,
      providerVersion: process.env.GIT_COMMIT,

      // Find _all_ pacts that match the current provider branch
      consumerVersionSelectors: [
        {
          mainBranch: true,
        },
        {
          deployedOrReleased: true,
        },
      ],

      enablePending: true,
      includeWipPactsSince: '2023-10-01',

      stateHandlers: {
        "there is a non-empty list of products": () => {
          productRepository.clearAll();
          
          productRepository.insert({ id: 11, name: "Some product name", price: 30.50 });
          productRepository.insert({ id: 22, name: "Some other name", price: 11.12 });
        },
        "there exists a product with id 12345": () => {
          productRepository.clearAll();
          productRepository.insert({ id: 12345, name: "Some product name", price: 30.50 });
        }
      }
    })
      .verifyProvider()
      .then(() => {
        console.log("Pact Verification Complete!");
      });
  });
});
