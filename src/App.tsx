// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import './components/Header.css';
import { Route, Routes } from 'react-router'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Layout from './components/Layout'
import Characters from './pages/Characters/Characters'
import Tales from './pages/Tales/Tales'
import Scenarios from './pages/Scenarios/Scenarios'
import Skills from './pages/Skills/Skills'
import AddSkillsForm from './pages/Skills/AddSkillsForm'
import Organizations from './pages/Organizations/Organizations'
import AddOrgsForm from './pages/Organizations/AddOrgsForm'
import Races from './pages/Races/Races'
import AddRacesForm from './pages/Races/AddRacesForm'
import AddCharacterForm from './pages/Characters/AddCharacterForm'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/characters' element={<Characters />} />
          <Route path='/characters/add' element={<AddCharacterForm />} />
          <Route path='/characters/edit/:id' element={<AddCharacterForm />} />
          <Route path='/tales' element={<Tales />} />
          <Route path='/scenarios' element={<Scenarios />} />
          <Route path='/skills' element={<Skills />} />
          <Route path='/skills/add' element={<AddSkillsForm />} />
          <Route path='/skills/edit/:id' element={<AddSkillsForm />} />
          <Route path='/organizations' element={<Organizations />} />
          <Route path='/organizations/add' element={<AddOrgsForm />} />
          <Route path='/organizations/edit/:id' element={<AddOrgsForm />} />
          <Route path='/races' element={<Races />} />
          <Route path='/races/add' element={<AddRacesForm />} />
          <Route path='/races/edit/:id' element={<AddRacesForm />} />
          <Route path='/*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App
