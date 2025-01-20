import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Race } from "../../utils/Types";
import { reachEndpoint } from "../../utils/Connection";

const emptyRace = {
  id: 0,
  name: '',
  story: '',
  traits: '',
}

export default function AddRacesForm() {
  const { id } = useParams();
  const [race, setRace] = useState<Race>(emptyRace);
  const [filled, setFilled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      reachEndpoint(`/races/${id}`, 'GET')
        .then((response) => setRace(response))
        .catch((error) => console.error('Error fetching data: ', error));
      setIsEditing(true);
    }
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement> |
    React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setRace({ ...race, [name]: value });

    if (race.name && race.story && race.traits) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (id) {
      reachEndpoint<Race>(`/races/${id}`, `PUT`, race)
        .then((response) => console.log('Raça atualizada:', response))
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      reachEndpoint<Race>('/races', 'POST', race)
        .then((response) => console.log('Raça criada:', response))
        .catch((error) => console.error('Error fetching data:', error));
    }
    setRace(emptyRace);
  }

  return (
    <div>
      {isEditing ? (
        <h1>Editar raça</h1>
      ) : (
        <h1>Adicionar nova raça</h1>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={race.name}
            onChange={handleChange}
          />
        </label>
        <label>
          História:
          <textarea
            name="story"
            value={race.story}
            onChange={handleChange}
          />
        </label>
        <label>
          Traços:
          <textarea
            name="traits"
            value={race.traits}
            onChange={handleChange}
          />
        </label>
        <button disabled={!filled}>Enviar</button>
      </form>
      <Link to='/races'><button>Voltar</button></Link>
    </div>
  )
}