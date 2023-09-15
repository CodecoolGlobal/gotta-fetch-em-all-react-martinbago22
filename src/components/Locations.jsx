import { useEffect, useState } from "react"

export default function Locations({ onSelect }) {

  const [locations, setLocations] = useState(null);

  useEffect(() => {

    const fetchLocations = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/location');
        const locations = await response.json();
        setLocations(locations.results);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLocations();
  }, [])

    function convertName(name){
      return name.split('-').map((name) => name[0].toUpperCase() + name.slice(1)).join(' ');
    }

  return (
    <div id="locationPage">
      <h2 className="title">Locations</h2>
      <div id="locations">
        {locations && locations.map((location) => {
          return <div className="location" key={location.name}>
            <span className='locationName'>{convertName(location.name)}</span>
            <button type="button"
              className='locationButton'
              data-url={location.url}
              onClick={() => onSelect(location.url)}>Visit</button>
          </div>
        })}
      </div>
    </div>
  )
}