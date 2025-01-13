import { useEffect, useState } from "react";
import { fetchEndpoint } from "../../utils/Connection";
import axios from "axios";
import { Link } from "react-router";
import { Organization } from "../../utils/Types";

export default function Organizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  useEffect(() => {
    fetchEndpoint('/organizations')
      .then((response) => {
        setOrganizations(response)
      }).catch((error) => {
        console.error('Error fetching data: ', error)
      });
  }, []);

  function handleDelete(id: number) {
    if (window.confirm('Tem certeza que deseja deletar esta organização?')) {
      axios.delete(`http://localhost:8080/organizations/${id}`)
        .then(() => {
          setOrganizations(organizations.filter((org) => org.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting data: ', error);
        });
    }
  }

  return (
    <div>
      {organizations ? (
        organizations.map(({ id, name, purpose }) => (
          <div key={id}>
            <h2>{name}</h2>
            <p>Propósito: {purpose}</p>
            <Link to={`/organizations/edit/${id}`}><button>Editar</button></Link>
            <button onClick={() => handleDelete(id)}>Deletar</button>
          </div>
        ))
      ) : (
        <h1>Loading... 🍌</h1>
      )
      }
      <Link to='/organizations/add'><button>Criar nova</button></Link>
    </div>
  )
}