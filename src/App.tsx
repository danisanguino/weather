import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './App.css'
import { WeatherCard } from './components/weatherCard';
import { WeatherDaysCard } from './components/weatherDaysCard';
import { WeatherApiResponse } from './interfaces/weatherInterfaceDays';
import { callApiWeather } from './utils/callApi';
import { WeatherCardGeolocation } from './components/geolocation';
import { WeatherDaysCardGeolocation } from './components/weatherDaysCardGeolocation';



function App() {

  
  const [weather, setWeather] = useState<WeatherApiResponse>();
  const [inputValue, setInputValue] = useState<string>();
  const [url, setUrl] = useState<string | undefined>();
  const [urlError, setUrlError] = useState<string | null>()
  const [forecast, setForecast] = useState<any>(null); 
  
  
  //input control
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  
  //form send
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      
    setUrl(`https://api.weatherapi.com/v1/forecast.json?key=86af34dd3c794c26831102238242409&q=${inputValue}&days=7`);
  }
  
  const fetchWeather = async () => {
    if (url) {
      try {
        const data = await callApiWeather(url); // Usamos la función importada
        setWeather(data);
        setUrlError(null);
      } catch (error) {
        setUrlError("Error fetching weather data");
      }
    }
  };

  const handleWeatherDataFetched = (forecastData: any) => {
    setForecast(forecastData);
  };

  useEffect(() => {
    fetchWeather();
  }, [url]);
  

  return (
  <>
    <h1>THE WEATHER FOR YOU</h1>

    {
      urlError ? <h5>"Please insert a valid Location"</h5>: ""
    }

    {/* LAPTOP   */}
    <section className='container-weather'>
      {/* Input */}
      <div className='input-days'>
            <form onSubmit={ handleSubmit }>
                <input
                  name ="searchLocation"
                  type="text"
                  placeholder='Insert Location'
                  value={inputValue || ""}
                  onChange={ handleInputChange }
                />
            </form>

            {
              // Weather in days
              weather ?
              <WeatherDaysCard
                {...weather}
                />
              :
              <>
              {forecast && <WeatherDaysCardGeolocation forecast={forecast} />} 
              </> 
            }
      </div>
    {
      weather ?
      // Weather today
      <WeatherCard
        {...weather}
        />
      :
      <WeatherCardGeolocation onWeatherDataFetched={handleWeatherDataFetched}/>
      
  }
      
    </section>

  {/* MOBILE */}
        <section className='container-weather-mobile'>
          {/* Input */}
          
        <form onSubmit={ handleSubmit }>
            <input
              name ="searchLocation"
              type="text"
              placeholder='Insert a location'
              value={inputValue || ""}
              onChange={ handleInputChange }
            />
        </form>

        {
          weather ?
          // Weather today
          <WeatherCard
            {...weather}
            />
          :
          <WeatherCardGeolocation onWeatherDataFetched={handleWeatherDataFetched}/>
        }

        {
          // Weather in days
          weather ?
          <WeatherDaysCard
            {...weather}
            />
          :
          <>
            {forecast && <WeatherDaysCardGeolocation forecast={forecast} />} 
          </> 
        }
          

    </section>

  </>


  )
}

export default App
