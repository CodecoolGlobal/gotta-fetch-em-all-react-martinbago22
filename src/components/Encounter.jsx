import Pokemon from "./Pokemon";
import { useState, useEffect } from "react";

export default function Encounter({ playerPokemons, enemyPokemon, onFight }) {

  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [allPokemons, setAllPokemons] = useState([]);
  const [fightingPokemons, setFightingPokemons] = useState([]);

  function handleChooseButton(name) {
    const selectedPokemon = allPokemons.find((pokemon) => pokemon.name === name);
    console.log(name);
    console.log(allPokemons);
    setFightingPokemons([...fightingPokemons, selectedPokemon]);
  }

  useEffect(() => {
    const fetchPokemons = async (name, player) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        const pokemon = await response.json();
        if (player === 'player') {
          setAllPokemons((allPokemons) => [...allPokemons, pokemon]);
          console.log(allPokemons);
        } else if (player === 'enemy') {
          setFightingPokemons([...fightingPokemons, pokemon]);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchPokemons(enemyPokemon, 'enemy');
    playerPokemons.forEach((pokemon) => {
      console.log(pokemon);
      fetchPokemons(pokemon, 'player');
    });
  }, [])

  function handleFightButton(fightingPokemons) {
    onFight(fightingPokemons);
  }

  return (
    <>
      <div id="encounterPage">
        <div>
          <h1>Enemy</h1>
          <Pokemon pokemon={enemyPokemon}></Pokemon>
        </div>
        <div>Your Pokemons
          {playerPokemons.map((pokemon) => {
            return <>
              <Pokemon pokemon={pokemon} key={pokemon}></Pokemon>
              <button onClick={() => handleChooseButton(pokemon)}>Choose</button>
            </>
          })}
        </div>
        <button id="fightButton" onClick={() => handleFightButton(fightingPokemons)}>Fight!</button>
      </div>
    </>
  )
}