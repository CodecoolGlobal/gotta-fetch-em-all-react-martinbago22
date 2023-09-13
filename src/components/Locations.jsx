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
    <div id="locationPage">Locations
      {locations && locations.map((location) => {
        return <div className="location" key={location.name}>{location.name}
          <button type="button"
           data-url={location.url}
           onClick={() => handleVisitButton(location.url)}>Visit</button>
        </div>
      })};
    </div>
  )
}