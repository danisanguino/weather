import { useState, useEffect } from 'react';
import { Location } from '../interfaces/location';
import { callApiWeather } from '../utils/callApi';
import { Loader } from './loader';



export const WeatherCardGeolocation = () => {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true);


  // Get user Location
  const getLocation = () => {
    if (navigator.geolocation) {
      
      //get coords 
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },

        //possible errors 
        (error: GeolocationPositionError) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("The user has rejected the geolocation request.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("The location request isn't available.");
              break;
            case error.TIMEOUT:
              setError("The request to obtain the location has expired.");
              break;
            default:
              setError("Unexpected error.");
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Llamada a la API de clima
  const fetchWeather = async (lat: number, lon: number) => {

    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=86af34dd3c794c26831102238242409&q=${lat},${lon}&days=7`;
      const weatherData = await callApiWeather(url);
      setWeather(weatherData); 
      setLoading(false); 

    } catch (error) {
      setError("Error al obtener el clima.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeather(location.latitude, location.longitude); // Llamar a la API cuando tengamos la ubicación
    }
  }, [location]);

  return (
    <>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="card">
            {!loading ? (
              <Loader/>
            ) : (
              <>
                <p>Your Location: {weather.location.name} ({weather.location.region})</p>
                <img src={weather.current.condition.icon}/>
                <h2>{weather.current.temp_c}º</h2>
              </>
            )}
        </div> 
      )}
    </>
    
  );
};
