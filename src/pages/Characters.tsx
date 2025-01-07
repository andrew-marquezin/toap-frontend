import { useEffect, useState } from "react";
import { fetchEndpoint } from "../utils/Connection";
import { Character } from "../utils/Types";

export default function Characters() {
  const [characters, setCharacters] = useState<Character[] | null>(null);

  useEffect(() => {
    fetchEndpoint('/characters')
      .then((response) => {
        setCharacters(response);
      }).catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);
  console.log(characters);

  return (
    <div>
      {/* <h1>Página dedicada a personagens</h1> */}
      {characters ? (
        characters.map(({ id, name, race, organization, realm }, index) => (
          <div key={index + id}>
            <h2>{name}</h2>
            <h3>Raça: {race.name}</h3>
            <h3>Serve a: {organization.name}</h3>
            <h3>Veio de: {realm.name}</h3>
          </div>
        ))
      ) : (
        <h1>Loading... 🍌</h1>
      )}
    </div>
  )
}