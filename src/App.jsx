import { useState } from 'react'
import './App.css'
import Locations from './components/Locations'
import Areas from './components/Areas';

function App() {
  const [page, SetPage] = useState('Location');
  const [area, setArea] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);

  function handleClick(locationUrl) {
    setArea(locationUrl);
  }

  function handleEnemyPokemon(pokemon){
    setEnemyPokemon(pokemon)
    console.log(enemyPokemon)
  }

  return (
    <>
    {area ? (<Areas url={area} onPokemon={handleEnemyPokemon}/>) : (<Locations onSelect={handleClick}></Locations>)}
    
    </>
  )
}

export default App
