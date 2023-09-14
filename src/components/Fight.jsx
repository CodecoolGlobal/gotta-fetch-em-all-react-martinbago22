import { useState } from "react";
import Pokemon from "./Pokemon";

export default function Fight({ enemy, player }) {
  
  const [enemyPokemon, setEnemyPokemon] = useState(enemy);
  const [playerPokemon, setPlayerPokemon] = useState(player);
  let playerTurn = true;

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  function handleFightClick() {
    if (playerTurn) {
      const enemyDefense = enemyPokemon.stats[2]["base_stat"];
      const playerAttack = playerPokemon.stats[1]["base_stat"];
      const randomZ = randomNumber(217, 255);
      const damage = Math.round(((((2 / 5 + 2) * playerAttack * 60 / enemyDefense) / 50) + 2) * randomZ / 255);
      const updatedEnemyPokemon = {
        ...enemyPokemon, stats: [...enemyPokemon.stats]
      };
      updatedEnemyPokemon.stats[0]['base_stat'] -= damage;
      playerTurn = false;
      setEnemyPokemon(updatedEnemyPokemon);

    } else if (!playerTurn) {
      const enemyAttack = enemyPokemon.stats[1]["base_stat"];
      const playerDefense = playerPokemon.stats[2]["base_stat"];
      const randomZ = randomNumber(217, 255);
      const damage = Math.round(((((2 / 5 + 2) * enemyAttack * 60 / playerDefense) / 50) + 2) * randomZ / 255);
      const updatedPlayerPokemon = {
        ...playerPokemon, stats: [...playerPokemon.stats]
      };
      updatedPlayerPokemon.stats[0]['base_stat'] -= damage;
      playerTurn = true;
      setPlayerPokemon(updatedPlayerPokemon);
    }
  }


  return (
    <>
      <h2 className="title">Fight!</h2>
      <div className="pokeFight">
        <Pokemon name={enemyPokemon.name} pokemon={enemyPokemon} />
        <Pokemon name={playerPokemon.name} pokemon={playerPokemon} />
        <button onClick={handleFightClick}>Fight!</button>
      </div>
    </>
  )
}