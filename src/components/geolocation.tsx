import { useState, useEffect } from 'react';
import { Location } from '../interfaces/location';
import { callApiWeather } from '../utils/callApi';



export const WeatherCardGeolocation = () => {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null); // Estado para almacenar el resultado de la API de clima
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga

  // Obtener la ubicación del usuario
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error: GeolocationPositionError) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("El usuario ha rechazado la solicitud de geolocalización.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("La información de la ubicación no está disponible.");
              break;
            case error.TIMEOUT:
              setError("La solicitud para obtener la ubicación ha caducado.");
              break;
            default:
              setError("Ocurrió un error inesperado.");
          }
        }
      );
    } else {
      setError("La geolocalización no es soportada por este navegador.");
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
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="card">
                  <p>Your Location: {weather.location.name} ({weather.location.region})</p>
                  <img src={weather.current.condition.icon}/>
                  <h2>{weather.current.temp_c}º</h2>
            </div> 
          )}
        </>
      )}
    </>
    
  );
};
