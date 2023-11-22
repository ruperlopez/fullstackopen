import axios from "axios";
import React, { useState } from "react";

const Weather = ({ capital }) => {
	const [weather, setWeather] = useState(null);

  // to make it work we need to use an environment variable
  // /{
  /*
	if (!weather) {
		axios
			.get(
				`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${capital}&aqi=no`,
			)
			.then((response) => {
				setWeather(response.data);
			})
			.catch((err) =>
				console.log("Error fetching weather data:", err.response.data.error),
			);
	}
*/
	return (
		<>
      {/*
			{weather && (
				<div>
					<h3>Weather in {weather.location.name}</h3>
					<p>Temperature: {weather.current.temp_c} Celsius</p>
					<img
						src={weather.current.condition.icon}
						alt={weather.current.condition.text}
					/>
					<p>Wind: {weather.current.wind_mph} mph</p>
				</div>
			)}
      */}
		</>
	);
};

export default Weather;
