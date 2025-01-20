import { NavLink } from "react-router";

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/characters'>Personagens</NavLink>
        <NavLink to='/tales'>Contos</NavLink>
        <NavLink to='/scenarios'>Cenários</NavLink>
        <NavLink to='/skills'>Habilidades</NavLink>
        <NavLink to='/organizations'>Organizações</NavLink>
        <NavLink to='/races'>Raças</NavLink>
      </nav>
    </header>
  )
}