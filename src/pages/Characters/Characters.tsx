import { useEffect, useState } from "react";
import { reachEndpoint } from "../../utils/Connection";
import { Character } from "../../utils/Types";
import { Link } from "react-router";

export default function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    reachEndpoint('/characters', 'GET')
      .then((response) => setCharacters(response))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  function handleDelete(id: number) {
    if (window.confirm('Tem certeza que deseja deletar esse personagem?')) {
      reachEndpoint(`/characters/${id}`, 'DELETE')
        .then(() => setCharacters(characters.filter((e) => e.id !== id)))
        .catch((error) => console.error('Error deleting data: ', error));
    }
  }

  console.log(characters)
  return (
    <div>
      <h1>Página dedicada a personagens</h1>
      {characters ? (
        characters.map(({ id, name, race, organization, realm }, index) => (
          <div key={index + id}>
            <h2>{name}</h2>
            <h3>Raça: {race.name}</h3>
            <h3>Serve a: {organization.name}</h3>
            <h3>Veio de: {realm.name}</h3>
            <Link to={`/characters/edit/${id}`}><button>Editar</button></Link>
            <button onClick={() => handleDelete(id)}>Deletar</button>
          </div>
        ))
      ) : (
        <h1>Loading... 🍌</h1>
      )}
      <Link to='/characters/add'><button>Criar novo</button></Link>
    </div>
  )
}