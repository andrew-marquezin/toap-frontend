import axios from "axios";

export async function fetchEndpoint(endpoint: string) {
  const { data } = await axios.get(`http://localhost:8080${endpoint}`)
  return data
}