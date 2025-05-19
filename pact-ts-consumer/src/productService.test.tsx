import { PactV3, MatchersV3 } from "@pact-foundation/pact";
import path from "path";
import { ProductsAPIClient } from "./productsAPIClient";

// Create a 'pact' between the two applications in the integration we are testing
const provider = new PactV3({
  dir: path.resolve(process.cwd(), "../pacts"),
  consumer: "ProductsUI",
  provider: "ProductsAPI",
});

const productExample = { id: 1, name: "Wireless Mouse" };

const EXPECTED_BODY = MatchersV3.eachLike(productExample);

describe("GET /products", () => {
  let productsAPIClient: ProductsAPIClient;

  it("returns an HTTP 200 and a list of products", () => {
    // Arrange: Setup our expected interactions
    //
    // We use Pact to mock out the backend API
    provider
      .given("there is a non-empty list of products")
      .uponReceiving("a request for all products")
      .withRequest({
        method: "GET",
        path: "/products",
        headers: { Accept: "application/json" },
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: EXPECTED_BODY,
      });

    return provider.executeTest(async (mockserver) => {
      // Act: test our API client behaves correctly
      //
      // Note we configure the DogService API client dynamically to
      // point to the mock service Pact created for us, instead of
      // the real one
      productsAPIClient = new ProductsAPIClient(mockserver.url);
      const response = await productsAPIClient.getAllProducts();

      // Assert: check the result
      expect(response.data[0]).toEqual(productExample);
    });
  });
});
