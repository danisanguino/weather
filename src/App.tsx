import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './App.css'
import { WeatherCard } from './components/weatherCard';
import { WeatherDaysCard } from './components/weatherDaysCard';
import { WeatherApiResponse } from './interfaces/weatherInterfaceDays';


function App() {
  
  const [weather, setWeather] = useState<WeatherApiResponse>();
  const [inputValue, setInputValue] = useState<string>();
  const [url, setUrl] = useState<string | undefined>()
  
  
  //funcion control del input
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  
  //function envio de formulario
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      
    setUrl(`http://api.weatherapi.com/v1/forecast.json?key=86af34dd3c794c26831102238242409&q=${inputValue}&days=7`);
  }
  

  //función llamada Api
  const callApiWeather = async (url: string) => {
    try {
          const resp = await fetch(url);
          const data: WeatherApiResponse = await resp.json();
          
          setWeather(data);
        
      } catch (error) {
          console.log("Aqui no furula algo Juan")
      }
  }

  useEffect(() => {
    if (url) {
      callApiWeather(url)
    }
  }, [url])
  

  return (
  <>
    <h1>THE WEATHER FOR YOU</h1>
    <section className='container-weather'>
      <div className='input-days'>
            <form onSubmit={ handleSubmit }>
                <input
                  name ="searchLocation"
                  type="text"
                  placeholder='Location, CP...'
                  value={inputValue || ""}
                  onChange={handleInputChange}
                />
            </form>

            {
              weather ?
              <WeatherDaysCard
                {...weather}
                />
              :
              ""
            }
      </div>
    {
      weather ?
      <WeatherCard
        {...weather}
        />
      :
      <h3>Plase insert a Location</h3>
    }
      
    </section>
  </>
  )
}

export default App
