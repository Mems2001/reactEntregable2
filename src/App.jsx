import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import CardWeather from './components/CardWeather'


function App() {

  const [coords1, setcoords1] = useState()

  useEffect (
    () => {

      const success = (pos) => {
        const latlon = {
          lat : pos.coords.latitude ,
          lon : pos.coords.longitude
        }
        setcoords1 (latlon)
        // console.log (pos)
      }

      navigator.geolocation.getCurrentPosition (success)
    } , []
  )

  const [backImg, setbackImg] = useState("")

  return (
    <div className={`App b${backImg}`}>

      
      <CardWeather lon={coords1?.lon} lat={coords1?.lat} backImg={setbackImg}/>

    </div>
  )
}

export default App
