import React from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
	if (countries.length > 10) {
		return <div>Too many matches, specify another filter.</div>;
	} else if (countries.length === 1) {
		const country = countries[0];
		return <Country country={country} />;
	} else {
		return countries.map((country) => (
			<div key={country.name.common}>{country.name.common}</div>
		));
	}
};

export default Countries;
