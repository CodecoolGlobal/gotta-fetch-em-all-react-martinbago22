import { useEffect, useState } from 'react'
import './App.css'
import Locations from './components/Locations'
import Areas from './components/Areas';
import Encounter from './components/Encounter';
import Fight from './components/Fight';
import druImage from './images/dru.jpg';
import petImage from './images/pti.jpg';
import bagImage from './images/bgo.jpg';

function App() {
  const [page, SetPage] = useState('Location');
  const [area, setArea] = useState(null);
  const [enemyPokemonName, setEnemyPokemonName] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const playerPokemons = [
    {name: 'hapff', types: [{slots: 1, type: {name: 'psychic'}}], 
    sprites: {other: {['official-artwork']: {front_default: druImage}}}, 
    stats: [
      {base_stat: 666},
      {base_stat: 666},
      {base_stat: 666}
    ]},
    {name: 'pretepnuk', types: [{slots: 1, type: {name: 'fairy'}}], 
    sprites: {other: {['official-artwork']: {front_default: petImage}}}, 
    stats: [
      {base_stat: 420},
      {base_stat: 69},
      {base_stat: 1}
    ]},
    {name: 'pushúú', types: [{slots: 1, type: {name: 'ghost'}}], 
    sprites: {other: {['official-artwork']: {front_default: bagImage}}}, 
    stats: [
      {base_stat: 100},
      {base_stat: 60},
      {base_stat: 40}
    ]},
  ];

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
    SetPage('Fight');
  }

  function handleHomeButton() {
    SetPage('Location');
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
    return <Encounter playerPokemons={playerPokemons} enemyPokemonName={enemyPokemonName} onChoose={handleChooseButton}></Encounter>
  } else if (page === 'Fight' && enemyPokemon && playerPokemon) {
    return <Fight player={playerPokemon} enemy={enemyPokemon} onHome={handleHomeButton}></Fight>
  }
}

export default App
