import Pokemon from "./Pokemon";

export default function Encounter({ playerPokemons, enemyPokemon, onChoose }) {

  function handleChooseButton(location) {
    onChoose(location)
  }
  return (
    <>
    <div id="encounterPage">
      <div>
        <Pokemon pokemon={enemyPokemon}></Pokemon>
        {console.log(<Pokemon pokemon='bulbasaur' />)}
      </div>
      <div>
        {playerPokemons.map((pokemon) => {
          return <>
            <Pokemon pokemon={pokemon} key={pokemon}></Pokemon>
            <button onClick={() => handleChooseButton('Fight')}>Choose</button>
          </>
        })}
      </div>
      </div>
    </>
  )
}