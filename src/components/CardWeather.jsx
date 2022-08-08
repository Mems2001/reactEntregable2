import React, { useEffect , useState } from 'react'
import axios from 'axios'
import LoaderScreen from './LoaderScreen'

const CardWeather = ({lon , lat , backImg}) => {

    const [isLoaded, setisLoaded] = useState(false)

    const [units, setunits] = useState("metric")

    const changeUnits = () => {
        if (units == "metric") {
            setunits ("imperial")
        } else if (units == "imperial") {
            setunits ("metric")
        }
    }

    const [Weather, setWeather] = useState()

    const apiKey = 'c44d1ef3bf897914bb56c04bada131fc'
  
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`

    const [shadow, setshadow] = useState()

  useEffect (
    () => {
        if (lat && lon) {
            
            axios.get(URL)
            .then (
                res => 
                {
                    setWeather(res.data)
                    setisLoaded(true)
                }
                )
            .catch (err => console.log(err))
        }
    } , [lat , lon , units]
  )

  useEffect (
    () => {

        let a = Weather?.weather[0].icon
        let b = String(a)[2]
        backImg (a)
        setshadow (b)

    } , [Weather?.weather[0].icon]
  )


//   console.log (Weather)

if (isLoaded == false) {
    return (
        <LoaderScreen />    
    ) 
} else {

  return (

    <div className='container'>

        <h1>Weather Today:</h1>

    <div className={`cardW shad${shadow}`}>
        
        <div className='locCont'>
            <span className='textC'>{`${Weather?.name}, ${Weather?.sys.country}`}</span>
            <span className='textC'>{Weather?.weather[0].description}</span>
        </div>

        <div>
            <img src={Weather && `http://openweathermap.org/img/wn/${Weather?.weather[0].icon}@4x.png`} />
        </div>

        <div className='tempCont'>

            <span className='tempText'>{Weather?.main.temp}°</span>
            <button onClick={changeUnits}>{units=="metric" ? "Change to Farenheit" : "Change to Celcius"}</button>

        </div>

        <div className='weatherInfo'>
            <span className='textC'>Feels like : {Weather?.main.feels_like}°</span>
            <span className='textC'>Min. Temperature : {Weather?.main.temp_min}°</span>
            <span className='textC'>Max. Temperature : {Weather?.main.temp_max}°</span>
            <span className='textC'>Pressure : {Weather?.main.pressure} hPa</span>
            <span className='textC'>Humidity : {Weather?.main.humidity}</span>
            
        </div>

    </div>
    </div>
  )
}
}

export default CardWeather