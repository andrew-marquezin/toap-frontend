import { useEffect, useState } from "react"
import { Race } from "../../utils/Types"
import { reachEndpoint } from "../../utils/Connection"
import { Link } from "react-router";

export default function Races() {
  const [races, setRaces] = useState<Race[]>([])
  useEffect(() => {
    reachEndpoint('/races', 'GET')
      .then((response) => setRaces(response))
      .catch((error) => console.error('Error fetching data: ', error))
  }, []);

  function handleDelete(id: number) {
    if (window.confirm('Tem certeza que deseja deletar esta raça?')) {
      reachEndpoint(`/races/${id}`, 'DELETE')
        .then(() => setRaces(races.filter((e) => e.id !== id)))
        .catch((error) => console.error('Error deleting data: ', error));
    }
  }

  return (
    <div>
      <h1>Raças</h1>
      {races ? (
        races.map(({ id, name, story, traits }) => (
          <div key={id}>
            <h2>{name}</h2>
            <p>{story}</p>
            <p>{traits}</p>
            <Link to={`/races/edit/${id}`}><button>Editar</button></Link>
            <button onClick={() => handleDelete(id)}>Deletar</button>
          </div>
        ))
      ) : (
        <h1>Loading... 🍌</h1>
      )}
      <Link to='/races/add'><button>Criar nova</button></Link>
    </div>
  )
}