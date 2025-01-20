import { Link, useParams } from "react-router"
import React, { useEffect, useState } from "react";
import { fetchEndpoint } from "../../utils/Connection";
import { Skill } from "../../utils/Types";
import axios from "axios";

const emptySkill = {
  id: 0,
  name: '',
  description: '',
  characters: []
}

export default function AddSkillsForm() {
  const { id } = useParams();
  const [skill, setSkill] = useState<Skill>(emptySkill);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEndpoint(`/skills/${id}`)
        .then((response) => setSkill(response))
        .catch((error) => console.error('Error fetching data: ', error));
    }
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement> |
    React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setSkill({ ...skill, [name]: value });

    if (skill.name && skill.description) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:8080/skills/${id}`, skill)
        .then((response) => console.log('Habilidade atualizada:', response))
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      axios.post('http://localhost:8080/skills', skill)
        .then((response) => console.log('Habilidade criada:', response))
        .catch((error) => console.error('Error fetching data:', error));
    }
    setSkill(emptySkill);
  }

  return (
    <div>
      <h1>Adicionar nova habilidade</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            required
            type="text"
            name="name"
            value={skill.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Descrição:
          <textarea
            name="description"
            rows={4}
            cols={40}
            value={skill.description}
            onChange={handleChange}
          />
        </label>
        <button disabled={!filled}>Confirmar</button>
      </form>
      <Link to='/skills'><button>Voltar</button></Link>
    </div>
  )
}