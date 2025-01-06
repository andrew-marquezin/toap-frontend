import { useEffect, useState } from "react"
import { Greeting } from "../utils/Types"
import { fetchEndpoint } from "../utils/Connection";

export default function Home() {
  const [data, setData] = useState<Greeting | null>(null);

  useEffect(() => {
    fetchEndpoint('/greeting/🍌')
      .then((response) => {
        setData(response.data);
      }).catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <>
      {data ? (
        <h1>{data.message}</h1>
      ) : (
        <h1>Loading... 🍌</h1>
      )}
    </>
  )
}