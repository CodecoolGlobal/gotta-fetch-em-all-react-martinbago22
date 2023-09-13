import { useEffect, useState } from "react";

export default function Fight({ enemyPokeName, playerPokeName }) {

  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [playerPokemon, setPlayerPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemons = async (name, state) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        const pokemon = await response.json();
        if (state === 'enemy') {
          setEnemyPokemon(pokemon);
        } else if (state === 'player') {
          setPlayerPokemon(pokemon);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchPokemons(enemyPokeName, 'enemy');
    fetchPokemons(playerPokeName, 'player');
  }, [])

  function handleFightClick() {
    console.log(enemyPokemon);
    console.log(playerPokemon);
  }

  return (
    <>
    <button onClick={handleFightClick}>Fight!</button>
    </>
  );
}