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

export default function Encounter({ playerPokemons, enemyPokemonName, onChoose }) {

  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [allPokemons, setAllPokemons] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState(null);

  function handleChooseButton(pokemon) {
    setChosenPokemon(pokemon);
    onChoose(pokemon, enemyPokemon);
    console.log(pokemon);
  }

  useEffect(() => {
    const task = async () => {
      // const fetchedPlayer = await fetchPlayerPokemons(playerPokemonsName);
      const fetchedEnemy = await fetchEnemyPokemon(enemyPokemonName);
      setEnemyPokemon(fetchedEnemy);
      setAllPokemons(playerPokemons);
      console.log(playerPokemons);
    }
    task();
  }, [enemyPokemonName, playerPokemons])


  if (allPokemons.length !== 0) {
    return <>
      <div id="encounterPage">
        <div className="enemyPokemon">
          <Pokemon pokemon={enemyPokemon}></Pokemon>
        </div>
        <div className="playerPokemons">
          {allPokemons.map((pokemon) => {
            return <>
            <div className="pokeWithButton">
              <Pokemon pokemon={pokemon} key={pokemon}></Pokemon>
              <button className="chooseButton" onClick={() => handleChooseButton(pokemon)}>Choose</button>
              </div>
            </>
          })}
        </div>
      </div>
    </>
  } else {
    return <h1>Loading...</h1>
  }
}