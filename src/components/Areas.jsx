import { useEffect, useState } from "react";

export default function Areas({ url, onPokemon, onBack }) {

  const [areas, setAreas] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const areas = await response.json();
        setAreas(areas.areas)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData();
  }, [url])

  const generateRandomPokemon = (area) => {
    const numberOfPokemons = Math.floor(Math.random() * area['pokemon_encounters'].length)
    onPokemon(area['pokemon_encounters'][numberOfPokemons].pokemon.name)
  }



  const handleEncounter = async (url) => {
    try {
      const response = await fetch(url);
      const area = await response.json();
      generateRandomPokemon(area);
    } catch (err) {
      console.error(err)
    }
  }

  function handleBackButton() {
    onBack('Location')
  }

  return (
    <div id="areas">
      {areas && areas.map((area) => {
        return <div key={area.name} className='location'>{area.name}
          <button onClick={() => handleEncounter(area.url)}>Encounter</button>
        </div>
      })}
      <button className="button" onClick={handleBackButton}>Back</button>
    </div>
  )
}