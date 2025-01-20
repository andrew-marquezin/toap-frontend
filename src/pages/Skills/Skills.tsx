import { useEffect, useState } from "react"
import { Skill } from "../../utils/Types"
import { fetchEndpoint, reachEndpoint } from "../../utils/Connection"
import { Link } from "react-router";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  useEffect(() => {
    fetchEndpoint('/skills')
      .then((response) => setSkills(response))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  function handleDelete(id: number) {
    if (window.confirm('Tem certeza que deseja deletar esta habilidade?')) {
      reachEndpoint(`/skills/${id}`, 'DELETE')
        .then(() => setSkills(skills.filter((org) => org.id !== id)))
        .catch((error) => console.error('Error deleting data: ', error));
    }
  }

  return (
    <div>
      {skills ? (
        skills.map(({ id, name, description }) => (
          <div key={id}>
            <h2>{name}</h2>
            <p>{description}</p>
            <Link to={`/skills/edit/${id}`}><button>Editar</button></Link>
            <button onClick={() => handleDelete(id)}>Deletar</button>
          </div>
        ))
      ) : (
        <h1>Loading... 🍌</h1>
      )}
      <Link to='/skills/add'><button>Criar nova</button></Link>
    </div >
  )
}