import axios from "axios";

export function fetchEndpoint(endpoint: string) {
  return axios.get('http://localhost:8080' + endpoint)
}