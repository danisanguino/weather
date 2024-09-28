import { WeatherApiResponse } from "../interfaces/weatherInterfaceDays";


export const callApiWeather = async (url: string): Promise<WeatherApiResponse> => {

  try {
        const resp = await fetch(url);
        if (!resp.ok) {
          throw new Error("error que")
        }
        const data: WeatherApiResponse = await resp.json();
        return data;
      
    } catch (error) {
        console.error("Something is wrong with the URL or the API call");
        throw new Error("Error calling weather API");
    }
}