import { useState } from 'react'
import './App.css'
import Locations from './components/Locations'

function App() {
  const [page, SetPage] = useState('Location');
  const [area, setArea] = useState(null);

  function handleClick(locationUrl) {
    setArea(locationUrl);
    console.log(area);
  }

  return (
    <>
    {area ? (<div>{area}</div>) : (<Locations onSelect={handleClick}></Locations>)}
    
    </>
  )
}

export default App
