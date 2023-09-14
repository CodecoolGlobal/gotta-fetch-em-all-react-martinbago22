import { useState } from "react";
import Pokemon from "./Pokemon";

export default function Fight({ enemy, player, onBack }) {

  const [enemyPokemon, setEnemyPokemon] = useState(enemy);
  const [playerPokemon, setPlayerPokemon] = useState(player);
  const [result, setResult] = useState(null);


  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function handleBackButton() {
    onBack('Location')
  }

  function handleFight(playerTurn) {
    if (playerTurn) {
      const enemyDefense = enemyPokemon.stats[2]["base_stat"];
      const playerAttack = playerPokemon.stats[1]["base_stat"];
      const randomZ = randomNumber(217, 255);
      const damage = Math.round(((((2 / 5 + 2) * playerAttack * 60 / enemyDefense) / 50) + 2) * randomZ / 255);
      const updatedEnemyPokemon = {
        ...enemyPokemon, stats: [...enemyPokemon.stats]
      };
      updatedEnemyPokemon.stats[0]['base_stat'] -= damage;
      if (updatedEnemyPokemon.stats[0]['base_stat'] > 0) {
        setEnemyPokemon(updatedEnemyPokemon);
        setTimeout(() => handleFight(!playerTurn), 200);
      } else {
        setEnemyPokemon(updatedEnemyPokemon);
        setResult('win');
      }

    } else {
      const enemyAttack = enemyPokemon.stats[1]["base_stat"];
      const playerDefense = playerPokemon.stats[2]["base_stat"];
      const randomZ = randomNumber(217, 255);
      const damage = Math.round(((((2 / 5 + 2) * enemyAttack * 60 / playerDefense) / 50) + 2) * randomZ / 255);
      const updatedPlayerPokemon = {
        ...playerPokemon, stats: [...playerPokemon.stats]
      };
      updatedPlayerPokemon.stats[0]['base_stat'] -= damage;
      if (updatedPlayerPokemon.stats[0]['base_stat'] > 0) {
        setPlayerPokemon(updatedPlayerPokemon);
        setTimeout(() => handleFight(!playerTurn), 200);
      } else {
        setPlayerPokemon(updatedPlayerPokemon);
        setResult('lose');
      }
    }
  }

if (!result) {
  return (
    <>
      <h2 className="title">Fight!</h2>
      <div className="pokeFight">
        <div className="fightingPokemons">
        <Pokemon name={enemy.name} pokemon={enemyPokemon} />
        <Pokemon name={player.name} pokemon={playerPokemon} />
        </div>
        <button onClick={() => handleFight(true)}>Fight!</button>
      </div>
    </>
  )
} else if (result === 'win') {
  return (
    <>
      <h1 className="title">You win!!!</h1>
      <button className="back" onClick={handleBackButton}>The advnenture continues</button>
    </>
  )
} else if (result === 'lose') {
  return (
    <>
      <h1 className="title">You lose!!!</h1>
      <button className="back" onClick={handleBackButton}>Go home loser!!!</button>
    </>
  )
}
}