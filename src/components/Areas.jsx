import { useEffect, useState } from "react";

export default function Areas({ url, onPokemon }) {

  const [areas, setAreas] = useState(null);
  const [encounterArea, setEncounterArea] = useState(null);

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
  }, [])

  const generateRandomPokemon = () => {
    const numberOfPokemons = Math.floor(Math.random() * encounterArea['pokemon_encounters'].length)
    onPokemon(encounterArea['pokemon_encounters'][numberOfPokemons].pokemon.name) 
  }

  const handleEncounter = (e) => {
    const fetchData = async () => {
      try {
        const response = await fetch(e.target.getAttribute('data-url'));
        const area = await response.json();
        setEncounterArea(area)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
    generateRandomPokemon()
  }

  return (
    <div id="areas">
      {areas && areas.map((area) => {
        return <div key={area.name} className='location'>{area.name}
          <button onClick={(e) => handleEncounter(e)} data-url={area.url}>Encounter</button>
        </div>
      })}
    </div>
  )
}