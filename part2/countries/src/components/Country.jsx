import React from "react";

const Country = ({ country }) => {
	return (
		<>
			<h2>{country.name.common}</h2>
			<p>Capital: {country.capital[0]}</p>
			<p>Area: {country.area}</p>

			<div>
				<h3>Languages</h3>
				<ul>
					{Object.keys(country.languages).map((key) => (
						<li key={key}>{country.languages[key]}</li>
					))}
				</ul>
			</div>

			<img src={country.flags.svg} alt={country.flags.alt} width="160" />
		</>
	)
};

export default Country;
