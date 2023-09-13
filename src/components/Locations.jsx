import { useEffect, useState } from "react"

export default function Locations({ onSelect }) {

  const [locations, SetLocations] = useState(null);

  useEffect(() => {

    const fetchLocations = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/location');
        const locations = await response.json();
        SetLocations(locations.results);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLocations();
  }, [])

  function handleVisitButton(locationUrl) {
    onSelect(locationUrl);
  }

  return (
    <div id="locationPage">
      <h2 className="title">Locations</h2>
      <div id="locations">
        {locations && locations.map((location) => {
          return <div className="location" key={location.name}>
            <span className='locationName'>{location.name}</span>
            <button type="button"
              className='locationButton'
              data-url={location.url}
              onClick={() => handleVisitButton(location.url)}>Visit</button>
          </div>
        })}
      </div>
    </div>
  )
}