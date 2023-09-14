import { useEffect, useState } from 'react'
import './App.css'
import Locations from './components/Locations'
import Areas from './components/Areas';
import Encounter from './components/Encounter';
import Fight from './components/Fight';

function App() {
  const [page, SetPage] = useState('Location');
  const [area, setArea] = useState(null);
  const [enemyPokemonName, setEnemyPokemonName] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const playerPokemons = ['pikachu', 'vulpix', 'psyduck', 'squirtle'];

  function handleClick(locationUrl) {
    setArea(locationUrl);
    SetPage('Area');
  }

  function handleEnemyPokemon(pokemon) {
    setEnemyPokemonName(pokemon);
    SetPage('Encounter');
  }

  function handleBackButton(page) {
    SetPage(page);
  }

  function handleChooseButton(playerPokemon1, enemyPokemon) {
    setPlayerPokemon(playerPokemon1);
    setEnemyPokemon(enemyPokemon);
    console.log('ez a player', playerPokemon1);
    console.log('ez az enemy', enemyPokemon);
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
    return <Encounter playerPokemonsName={playerPokemons} enemyPokemonName={enemyPokemonName} onChoose={handleChooseButton}></Encounter>
  } else if (page === 'Fight' && enemyPokemon && playerPokemon) {
    return <Fight playerPokemon={playerPokemon} enemyPokemon={enemyPokemon}></Fight>
  }
}

export default App
