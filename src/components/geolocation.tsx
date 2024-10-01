import { useState, useEffect } from 'react';
import { Location } from '../interfaces/location';
import { callApiWeather } from '../utils/callApi';
import { Loader } from './loader';

interface WeatherCardGeolocationProps {
  onWeatherDataFetched: (forecast: any) => void; // Callback para pasar datos al padre
}

export const WeatherCardGeolocation = ({ onWeatherDataFetched }: WeatherCardGeolocationProps) => {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null); // Estado para almacenar el resultado de la API de clima
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga

  // Obtener la ubicación del usuario
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
              setError("The user has rejected the geolocation request. Please input a location.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("The location request isn't available. Please input a location.");
              break;
            case error.TIMEOUT:
              setError("The request to obtain the location has expired. Please input a location.");
              break;
            default:
              setError("Unexpected error. Please input a location.");
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser. Please input a location.");
    }
  };

  // Llamada a la API de clima
  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=86af34dd3c794c26831102238242409&q=${lat},${lon}&days=7`;
      const weatherData = await callApiWeather(url);
      setWeather(weatherData); 
      setLoading(false); 
      onWeatherDataFetched(weatherData.forecast); // Llama al callback con los datos del pronóstico
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
            {loading ? (
              <Loader/>
            ) : (
              <>
                <p>Your Location: {weather.location.name} ({weather.location.region})</p>
                <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
                <h2>{weather.current.temp_c}º</h2>
              </>
              )}
        </div> 
      )}
    </>
  );
};
