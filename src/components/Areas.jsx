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
    const numberOfPokemons = Math.floor(Math.random() * area['pokemon_encounters'].length);
    onPokemon(area['pokemon_encounters'][numberOfPokemons].pokemon.name);
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

  function convertName(name){
    return name.split('-').map((name) => name[0].toUpperCase() + name.slice(1)).join(' ');
  }

  return (
    <div id="areaPage">
      <h2 className="title">Areas</h2>
      <div id="areas">
        {areas && areas.map((area) => {
          return <div key={area.name} className='location'>
            <span className="locationName">{convertName(area.name)}</span>
            <button className="areaButton" onClick={() => handleEncounter(area.url)}>Encounter</button>
          </div>
        })}
      </div>
        <button className="back" onClick={handleBackButton}>Back</button>
    </div>
  )
}