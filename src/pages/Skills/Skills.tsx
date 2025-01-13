import { useEffect, useState } from "react"
import { Skill } from "../../utils/Types"
import { fetchEndpoint } from "../../utils/Connection"
import { Link } from "react-router";
import axios from "axios";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  useEffect(() => {
    fetchEndpoint('/skills')
      .then((response) => {
        setSkills(response)
      }).catch((error) => {
        console.error('Error fetching data: ', error)
      });
  }, []);

  function handleDelete(id: number) {
    axios.delete(`http://localhost:8080/skills/${id}`)
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
      )
      }
      <Link to='/skills/add'><button>Criar nova</button></Link>
    </div >
  )
}