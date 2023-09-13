import Pokemon from "./Pokemon";

export default function Encounter({ playerPokemons, enemyPokemon, onChoose }) {

  function handleChooseButton(location, name) {
    onChoose(location, name);
  }
  return (
    <>
    <div id="encounterPage">
      <div>
        <h1>Enemy</h1>
        <Pokemon pokemon={enemyPokemon}></Pokemon>
        {console.log(<Pokemon pokemon='bulbasaur' />)}
      </div>
      <div>Your Pokemons
        {playerPokemons.map((pokemon) => {
          return <>
            <Pokemon pokemon={pokemon} key={pokemon}></Pokemon>
            <button onClick={() => handleChooseButton('Fight', pokemon)}>Choose</button>
          </>
        })}
      </div>
      </div>
    </>
  )
}