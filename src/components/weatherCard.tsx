import "../App.css"
import { WeatherApiResponse } from '../interfaces/weatherInterfaceDays';


export const WeatherCard = (props: WeatherApiResponse) => {
  return (
    <div className="card">
      <p>Today in {props.location.name} ({props.location.region})</p>
      <img src={props.current.condition.icon}/>
      <h2>{props.current.temp_c}º</h2>
    </div>
  )
}
