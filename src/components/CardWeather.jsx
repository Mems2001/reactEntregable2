import React, { useEffect , useState } from 'react'
import axios from 'axios'

const CardWeather = ({lon , lat , backImg}) => {

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

  useEffect (
    () => {
        if (lat && lon) {
            

            axios.get(URL)
            .then (res => setWeather(res.data))
            .catch (err => console.log(err))
        }
    } , [lat , lon , units]
  )

  useEffect (
    () => {

        backImg (Weather?.weather[0].icon)

    } , [Weather?.weather[0].icon]
  )

  console.log (Weather)

  return (
    <div className='container'>

        <h1>Weather Today:</h1>

    <div className='cardW'>
        
        <div className='locCont'>
            <span>{`${Weather?.name}, ${Weather?.sys.country}`}</span>
            <span>{Weather?.weather[0].description}</span>
        </div>

        <div>
            <img src={Weather && `http://openweathermap.org/img/wn/${Weather?.weather[0].icon}@4x.png`} />
        </div>

        <div className='tempCont'>

            <span className='tempText'>{Weather?.main.temp}°</span>
            <button onClick={changeUnits}>{units=="metric" ? "Change to Farenheit" : "Change to Celcius"}</button>

        </div>

        <div className='weatherInfo'>
            <span>Feels like : {Weather?.main.feels_like}°</span>
            <span>Min. Temperature : {Weather?.main.temp_min}°</span>
            <span>Max. Temperature : {Weather?.main.temp_max}°</span>
            <span>Pressure : {Weather?.main.pressure}</span>
            <span>Humidity : {Weather?.main.humidity}</span>
            
        </div>

    </div>
    </div>
  )
}

export default CardWeather