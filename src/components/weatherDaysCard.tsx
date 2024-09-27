import "../App.css"
import { WeatherApiResponse } from '../interfaces/weatherInterfaceDays';
import { getDayOfWeek } from "../utils/dayOfWeek";

export const WeatherDaysCard = (props: WeatherApiResponse) => {

  if (!props.forecast || !props.forecast.forecastday) {
    return <div>"Something is wrong, please try again"</div>;
  }

  return (
    
    <section className="card-days">

        {props.forecast.forecastday.map(e => (
          <div className="day" key={e.date}>
            <p>{getDayOfWeek(e.date)}</p>
            <img src={e.day.condition.icon} alt={e.day.condition.text} />
            <h4>Max {e.day.maxtemp_c}º </h4>
            <h4>Min {e.day.mintemp_c}º</h4>
        </div>
      ))}

    </section>
  )
}
