import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './App.css'
import { WeatherCard } from './components/weatherCard';
import { WeatherDaysCard } from './components/weatherDaysCard';
import { WeatherApiResponse } from './interfaces/weatherInterfaceDays';


function App() {
  
  const [weather, setWeather] = useState<WeatherApiResponse>();
  const [inputValue, setInputValue] = useState<string>();
  const [url, setUrl] = useState<string | undefined>();
  const [urlError, setUrlError] = useState<string | null>()
  
  
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
          if (!resp.ok) {
            throw new Error("error que")
          }
          const data: WeatherApiResponse = await resp.json();
          setWeather(data);
          setUrlError(null);
        
      } catch (error) {
          console.log("Something is wrong with de URL")
          setUrlError("error to set")
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

    {
      urlError ? <h5>"Please insert a valid Location"</h5>: ""
    }

    <section className='container-weather'>

      <div className='input-days'>
            <form onSubmit={ handleSubmit }>
                <input
                  name ="searchLocation"
                  type="text"
                  placeholder='Location, CP...'
                  value={inputValue || ""}
                  onChange={ handleInputChange }
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
