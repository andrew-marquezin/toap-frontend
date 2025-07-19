import React, { useEffect, useState } from "react"
import { reachEndpoint } from "../../utils/Connection";
import { Character, CharacterPost, Organization, Race, Realm, Skill } from "../../utils/Types";
import { Link, useParams } from "react-router";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const emptyCharacter = {
  id: 0,
  name: '',
  raceID: 0,
  organizationID: 0,
  realmID: 0,
  skills: [],
}

export default function AddCharacterForm() {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterPost>(emptyCharacter)
  const [selectedSkills, setSelectedSkills] = useState<number[]>([])

  const [skills, setSkills] = useState<Skill[]>([])
  const [races, setRaces] = useState<Race[]>([])
  const [realms, setRealms] = useState<Realm[]>([])
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [isEditing, setIsEditing] = useState(false);
  // const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (id) {
      reachEndpoint(`/characters/${id}`, 'GET')
        .then((response) => {
          // console.log(response)
          const resChar: Character = response
          setCharacter(resChar)
          setSelectedSkills(resChar.skills.map((skill) => skill.id))
        })
        .catch((error) => console.error('Error fetching data: ', error));
      setIsEditing(true);
    }
    reachEndpoint('/races', 'GET').then((res) => setRaces(res))
    reachEndpoint('/realms', 'GET').then((res) => setRealms(res))
    reachEndpoint('/organizations', 'GET').then((res) => setOrganizations(res))
    reachEndpoint('/skills', 'GET').then((res) => setSkills(res))
  }, [id]);

  // function handleChange(e: React.ChangeEvent<HTMLInputElement> |
  //   React.ChangeEvent<HTMLSelectElement>) {
  //   const { name, value } = e.target;
  //   setCharacter({ ...character, [name]: value });

  //   if (character.name && character) {
  //     setFilled(true);
  //   } else {
  //     setFilled(false);
  //   }
  // }

  function toggleSkill(skillId: number) {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updatedCharacter = {
      ...character,
      skills: selectedSkills.map((id) => ({ id }))
    };

    reachEndpoint<CharacterPost>(id ? `/characters/${id}` : `/characters`, id ? 'PUT' : 'POST', updatedCharacter)
      .then(() => {
        toast.success('Personagem salvo com sucesso!')
        console.log('Personagem salvo com sucesso!')
      })
      .catch(() => toast.error('Erro ao salvar o personagem :('));
  }

  return (
    <div>
      {isEditing ? (
        <h1>Editar personagem</h1>
      ) : (
        <h1>Adicionar um personagem</h1>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={character.name}
              onChange={({ target }) => setCharacter({
                ...character, [target.name]: target.value
              })}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Race:
            <select
              value={character.raceID}
              name="raceID"
              onChange={({ target }) => setCharacter({
                ...character, [target.name]: Number(target.value)
              })}
              required
            >
              <option value="">Select a Race</option>
              {races.map((race) => (
                <option key={race.id} value={race.id}>
                  {race.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Organization:
            <select
              value={character.organizationID}
              name="organizationID"
              onChange={({ target }) => setCharacter({
                ...character, [target.name]: Number(target.value)
              })}
              required
            >
              <option value="">Select an Organization</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Realm:
            <select
              value={character.realmID}
              name="realmID"
              onChange={({ target }) => setCharacter({
                ...character, [target.name]: Number(target.value)
              })}
              required
            >
              <option value="">Select a Realm</option>
              {realms.map((realm) => (
                <option key={realm.id} value={realm.id}>
                  {realm.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>Skills:</label>
          {skills.map((skill) => (
            <div key={skill.id}>
              <label>
                <input
                  type="checkbox"
                  value={skill.id}
                  checked={selectedSkills.includes(skill.id)}
                  onChange={() => toggleSkill(skill.id)}
                />
                {skill.name}
              </label>
            </div>
          ))}
        </div>

        {isEditing ? (
          <button>Atualizar personagem</button>
        ) : (
          <button>Create Character</button>
        )}
      </form>
      <Link to='/characters'><button>Voltar</button></Link>
    </div>
  )
}