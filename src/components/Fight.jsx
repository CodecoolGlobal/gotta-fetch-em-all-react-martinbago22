import { useState } from "react";
import Pokemon from "./Pokemon";

export default function Fight({ enemy, player }) {

  const [enemyPokemon, setEnemyPokemon] = useState(enemy);
  const [playerPokemon, setPlayerPokemon] = useState(player);
  //const [playerTurn, setPlayerTurn] = useState(true);


  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function handleFight(playerTurn) {
    if (playerTurn) {
      console.log('player turn');
      const enemyDefense = enemyPokemon.stats[2]["base_stat"];
      const playerAttack = playerPokemon.stats[1]["base_stat"];
      const randomZ = randomNumber(217, 255);
      const damage = Math.round(((((2 / 5 + 2) * playerAttack * 60 / enemyDefense) / 50) + 2) * randomZ / 255);
      const updatedEnemyPokemon = {
        ...enemyPokemon, stats: [...enemyPokemon.stats]
      };
      updatedEnemyPokemon.stats[0]['base_stat'] -= damage;
      if (updatedEnemyPokemon.stats[0]['base_stat'] > 0) {
        //setPlayerTurn(false);
        console.log(playerTurn);
        setEnemyPokemon(updatedEnemyPokemon);
        setTimeout(() => handleFight(!playerTurn), 200);
      } else {
        setEnemyPokemon(updatedEnemyPokemon);
      }

    } else {
      console.log('enemy turn');
      const enemyAttack = enemyPokemon.stats[1]["base_stat"];
      const playerDefense = playerPokemon.stats[2]["base_stat"];
      const randomZ = randomNumber(217, 255);
      const damage = Math.round(((((2 / 5 + 2) * enemyAttack * 60 / playerDefense) / 50) + 2) * randomZ / 255);
      const updatedPlayerPokemon = {
        ...playerPokemon, stats: [...playerPokemon.stats]
      };
      updatedPlayerPokemon.stats[0]['base_stat'] -= damage;
      if (updatedPlayerPokemon.stats[0]['base_stat'] > 0) {
        //setPlayerTurn(true);
        console.log(playerTurn);
        setPlayerPokemon(updatedPlayerPokemon);
        setTimeout(() => handleFight(!playerTurn), 200);
      } else {
        setPlayerPokemon(updatedPlayerPokemon);
      }
    }
  }

  return (
    <>
      <h2 className="title">Fight!</h2>
      <div className="pokeFight">
        <Pokemon name={enemy.name} pokemon={enemyPokemon} />
        <Pokemon name={player.name} pokemon={playerPokemon} />
        <button onClick={() => handleFight(true)}>Fight!</button>
      </div>
    </>
  )