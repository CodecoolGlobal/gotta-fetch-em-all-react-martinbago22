import { useState } from 'react'
import './App.css'
import Locations from './components/Locations'
import Areas from './components/Areas';
import Pokemon from './components/Pokemon';

function App() {
  const [page, SetPage] = useState('Location');
  const [area, setArea] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);

  function handleClick(locationUrl) {
    setArea(locationUrl);
    SetPage('Area');
  }

  function handleEnemyPokemon(pokemon){
    setEnemyPokemon(pokemon);
    SetPage('Encounter');
  }

  function handleBackButton(page) {
    SetPage(page);
  }
  if (page === 'Location') {
    return (
      <Locations onSelect={handleClick}></Locations>
    )
  } else if (page === 'Area') {
    return (
      <Areas url={area} onPokemon={handleEnemyPokemon} onBack={handleBackButton}/>
    )
  } else if (page === 'Encounter') {
    return<Pokemon pokemon={enemyPokemon}></Pokemon>
  }
}

export default App
