import React, { useState, useEffect } from "react";
import WeatherForecastDay from "./WeatherForecastDay";
import "./WeatherForecast.css";
import axios from "axios";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coord]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  function load() {
    let apiKey = "d5c7423826b5765e4dd4d5b5fe0dca49";
    let longitude = props.coordinates.longitude;
    let latitude = props.coordinates.latitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);

    return null;
  }

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          <div className="col">
            <WeatherForecastDay data={forecast[0]} />
          </div>
          <div className="col">
            <WeatherForecastDay data={forecast[1]} />
          </div>
          <div className="col">
            <WeatherForecastDay data={forecast[2]} />
          </div>
          <div className="col">
            <WeatherForecastDay data={forecast[3]} />
          </div>
          <div className="col">
            <WeatherForecastDay data={forecast[4]} />
          </div>
        </div>
      </div>
    );
  } else {
    load();
  }
}
