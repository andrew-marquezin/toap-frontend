import { NavLink } from "react-router";

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/characters'>Personagens</NavLink>
        <NavLink to='/tales'>Contos</NavLink>
        <NavLink to='/scenarios'>Cenários</NavLink>
      </nav>
    </header>
  )
}