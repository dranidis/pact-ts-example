import axios, { AxiosPromise } from "axios";

// API Client that will fetch dogs from the Dog API
// This is the target of our Pact test
export class DogService {
  constructor(private url: string) {}

  public getMeDogs = (from: string): AxiosPromise => {
    return axios.request({
      baseURL: this.url,
      params: { from },
      headers: { Accept: "application/json" },
      method: "GET",
      url: "/dogs",
    });
  };
}
