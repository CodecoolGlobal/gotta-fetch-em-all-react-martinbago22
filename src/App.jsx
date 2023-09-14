import { useEffect, useState } from 'react'
import './App.css'
import Locations from './components/Locations'
import Areas from './components/Areas';
import Encounter from './components/Encounter';
import Fight from './components/Fight';

function App() {
  const [page, SetPage] = useState('Location');
  const [area, setArea] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const playerPokemons = ['pikachu', 'vulpix', 'psyduck', 'squirtle'];
  const [fightingPokemons, setFightingPokemons] = useState(null);

  function handleClick(locationUrl) {
    setArea(locationUrl);
    SetPage('Area');
  }

  function handleEnemyPokemon(pokemon) {
    setEnemyPokemon(pokemon);
    SetPage('Encounter');
  }

  function handleBackButton(page) {
    SetPage(page);
  }


  function handleFightButton(fightingPokemons) {
    setFightingPokemons(fightingPokemons);
    SetPage('Fight');
  }


  if (page === 'Location') {
    return (
      <Locations onSelect={handleClick}></Locations>
    )
  } else if (page === 'Area') {
    return (
      <Areas url={area} onPokemon={handleEnemyPokemon} onBack={handleBackButton} />
    )
  } else if (page === 'Encounter') {
    return <Encounter playerPokemons={playerPokemons} enemyPokemon={enemyPokemon} onFight={handleFightButton}></Encounter>
  } else if (page === 'Fight') {
    return <Fight pokemons={fightingPokemons}></Fight>
  }
}

export default App
