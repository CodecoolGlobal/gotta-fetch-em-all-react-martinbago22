import { useEffect, useState } from "react";
import FighterPokemon from "./FighterPokemon";

export default function Fight({ enemyPokeName, playerPokeName }) {

  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [playerPhase, setPlayerPhase] = useState(false);
  const [enemyPhase, setEnemyPhase] = useState(false);

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
    setPlayerPhase(true);
  }

  useEffect(() => {
    function playerDamage(max, min) {
      if (enemyPokemon && playerPokemon) {
        const enemyDefense = enemyPokemon.stats[2]["base_stat"];
        const playerAttack = playerPokemon.stats[1]["base_stat"];
        const randomZ = Math.floor(Math.random() * (max - min) + min);
        const damage = Math.round(((((2 / 5 + 2) * playerAttack * 60 / enemyDefense) / 50) + 2) * randomZ / 255);
        const updatedEnemyPokemon = {
          ...enemyPokemon, stats: [...enemyPokemon.stats]
        };
        updatedEnemyPokemon.stats[0]['base_stat'] -= damage;
        setEnemyPokemon(updatedEnemyPokemon);
      }
    }
    playerDamage(255, 217);
    setEnemyPhase(true);
    setPlayerPhase(false);
  }, [playerPhase])

  useEffect(() => {
    function enemyDamage(max, min) {
      if (enemyPokemon && playerPokemon) {
        const enemyAttack = enemyPokemon.stats[1]["base_stat"];
        const playerDefense = playerPokemon.stats[2]["base_stat"];
        const randomZ = Math.floor(Math.random() * (max - min) + min);
        const damage = Math.round(((((2 / 5 + 2) * enemyAttack * 60 / playerDefense) / 50) + 2) * randomZ / 255);
        const updatedPlayerPokemon = {
          ...playerPokemon, stats: [...playerPokemon.stats]
        };
        updatedPlayerPokemon.stats[0]['base_stat'] -= damage;
        setPlayerPokemon(updatedPlayerPokemon);
      }
    }
    enemyDamage(255, 217);
    setPlayerPhase(true);
    setEnemyPhase(false);
  }, [enemyPhase])

  return enemyPokemon && playerPokemon ?

    (
      <><h1>Fight!</h1>
        <FighterPokemon name={enemyPokemon.name}
          sprite={enemyPokemon.sprites.other["official-artwork"]["front_default"]}
          types={enemyPokemon.types}
          hp={enemyPokemon.stats[0]["base_stat"]}
          att={enemyPokemon.stats[1]["base_stat"]}
          def={enemyPokemon.stats[2]["base_stat"]}
        ></FighterPokemon>
        <FighterPokemon name={playerPokemon.name}
          sprite={playerPokemon.sprites.other["official-artwork"]["front_default"]}
          types={playerPokemon.types}
          hp={playerPokemon.stats[0]["base_stat"]}
          att={playerPokemon.stats[1]["base_stat"]}
          def={playerPokemon.stats[2]["base_stat"]}
        ></FighterPokemon>
        <button onClick={handleFightClick}>Attack!</button>
      </>
    ) : 'Loading';
}