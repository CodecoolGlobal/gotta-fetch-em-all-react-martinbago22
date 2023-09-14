import Pokemon from "./Pokemon";
import { useState, useEffect } from "react";

async function fetchEnemyPokemon(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  const enemyPokemon = await response.json();
  return enemyPokemon;
}

async function fetchPlayerPokemons(names) {
  const promises = names.map((name) => fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then((response) => {
      return response.json();
    })
  );
  const playerPokemons = await Promise.all(promises);
  return playerPokemons;
}

export default function Encounter({ playerPokemonsName, enemyPokemonName, onChoose }) {

  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [allPokemons, setAllPokemons] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState(null);

  function handleChooseButton(pokemon) {
    setChosenPokemon(pokemon);
    onChoose(pokemon, enemyPokemon);
  }

  useEffect(() => {
    const task = async () => {
      const fetchedPlayer = await fetchPlayerPokemons(playerPokemonsName);
      const fetchedEnemy = await fetchEnemyPokemon(enemyPokemonName);
      setEnemyPokemon(fetchedEnemy);
      setAllPokemons(fetchedPlayer);
    }
    task();
  }, [playerPokemonsName, enemyPokemonName])


  if (allPokemons.length !== 0) {
    return <>
      <div id="encounterPage">
        <div>
          <h1>Enemy</h1>
          <Pokemon pokemon={enemyPokemon}></Pokemon>
        </div>
        <div>Your Pokemons
          {allPokemons.map((pokemon) => {
            return <>
              <Pokemon pokemon={pokemon} key={pokemon}></Pokemon>
              <button onClick={() => handleChooseButton(pokemon)}>Choose</button>
            </>
          })}
        </div>
      </div>
    </>
  } else {
    return <h1>Loading...</h1>
  }
}