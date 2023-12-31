import React from "react";
import Country from "./Country";

const Countries = ({ countries, setFilter }) => {
	if (countries.length > 10) {
		return <div>Too many matches, specify another filter.</div>;
	} else if (countries.length === 1) {
		const country = countries[0];
		return <Country country={country} />;
	} else {
		return countries.map((country) => (
			<div key={country.name.common}>
				{country.name.common}
				<button onClick={() => setFilter(country.name.common)}>Show</button>
			</div>
		));
	}
};

export default Countries;
