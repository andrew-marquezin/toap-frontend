import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import { Organization } from "../../utils/Types";
import { fetchEndpoint, reachEndpoint } from "../../utils/Connection";

const emptyOrg = {
  id: 0,
  name: '',
  purpose: '',
  members: []
}

export default function AddOrgsForm() {
  const { id } = useParams();
  const [organization, setOrganization] = useState<Organization>(emptyOrg);
  const [filled, setFilled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEndpoint(`/organizations/${id}`)
        .then((response) => setOrganization(response))
        .catch((error) => console.error('Error fetching data: ', error));
      setIsEditing(true);
    }
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement> |
    React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setOrganization({ ...organization, [name]: value });

    if (organization.name && organization.purpose) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (id) {
      reachEndpoint<Organization>(`/organizations/${id}`, 'PUT', organization)
        .then((response) => console.log('Organização atualizada:', response))
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      reachEndpoint<Organization>('/organizations', 'POST', organization)
        .then((response) => console.log('Organização criada:', response))
        .catch((error) => console.error('Error fetching data:', error));
    }
    setOrganization(emptyOrg);
  }

  return (
    <div>
      {isEditing ? (
        <h1>Editar organização</h1>
      ) : (
        <h1>Adicionar nova organização</h1>
      )}
      <form onSubmit={handleSubmit}>
        <label>Nome:
          <input
            required
            type="text"
            id="name"
            name="name"
            value={organization.name}
            onChange={handleChange}
          />
        </label>
        <label>Propósito:
          <textarea
            id="purpose"
            name="purpose"
            value={organization.purpose}
            onChange={handleChange}
          />
        </label>
        <button disabled={!filled}>Enviar</button>
      </form>
      <Link to='/organizations'><button>Voltar</button></Link>
    </div>
  )
}