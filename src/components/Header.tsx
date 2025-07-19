import './Header.css';
import { NavLink } from "react-router";

export default function Header() {
  return (
    <header>
      <nav className="header-nav">
        <NavLink to='/' className='nav-btn' id="home-btn">Home</NavLink>
        <NavLink to='/characters' className='nav-btn' id="characters-btn">Personagens</NavLink>
        <NavLink to='/tales' className='nav-btn' id="tales-btn">Contos</NavLink>
        <NavLink to='/scenarios' className='nav-btn' id="scenarios-btn">Cenários</NavLink>
        <NavLink to='/skills' className='nav-btn' id="skills-btn">Habilidades</NavLink>
        <NavLink to='/organizations' className='nav-btn' id="orgs-btn">Organizações</NavLink>
        <NavLink to='/races' className='home-btn' id="races-btn">Raças</NavLink>
      </nav>
    </header>
  )
}