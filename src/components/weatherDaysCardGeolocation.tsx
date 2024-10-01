import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import "../App.css";
import { getDayOfWeek } from "../utils/dayOfWeek";

interface WeatherDaysCardGeolocationProps {
  forecast: any; 
}

export const WeatherDaysCardGeolocation = ({ forecast }: WeatherDaysCardGeolocationProps) => {
  if (!forecast || !forecast.forecastday) {
    return <div>Something is wrong, please try again</div>;
  }

  return (
    <section className="card-days">

      {forecast.forecastday.map((e: { date: any; day: { condition: { icon: string | undefined; text: string | undefined; }; maxtemp_c: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; mintemp_c: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; }) => (
        <div className="day" key={e.date}>
          <p>{getDayOfWeek(e.date)}</p>
          <img src={e.day.condition.icon} alt={e.day.condition.text} />
          <h4>Max</h4>
          <h4>{e.day.maxtemp_c}º</h4>
          <h4>Min</h4>
          <h4>{e.day.mintemp_c}º</h4>
        </div>
      ))}

    </section>
  );
};
