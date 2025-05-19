import axios, { AxiosPromise } from "axios";

// API Client that will fetch dogs from the Dog API
// This is the target of our Pact test
export class ProductsAPIClient {
  constructor(private url: string) {}

  public getAllProducts = (): AxiosPromise => {
    return axios.request({
      baseURL: this.url,
      headers: { Accept: "application/json" },
      method: "GET",
      url: "/products",
    });
  };

  public getProduct = (id: string): AxiosPromise => {
    return axios.request({
      baseURL: this.url,
      headers: { Accept: "application/json" },
      method: "GET",
      url: `/products/${id}`,
    });
  };
}
