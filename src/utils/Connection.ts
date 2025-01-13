import axios from "axios";
import { Response } from "./Types";

export async function fetchEndpoint(endpoint: string) {
  const { data } = await axios.get(`http://localhost:8080${endpoint}`)
  return data
}

export async function postEndpoint(endpoint: string) {
  const { data } = await axios.post(`http://localhost:8080${endpoint}`)
  return data
}

export async function reachEndpoint<T>(endpoint: string, method: string, data: T): Promise<Response<T>> {
  const { data: response } = await axios({
    url: `http://localhost:8080${endpoint}`,
    method: method,
    data: data
  })
  return response
}