import { useEffect, useState } from "react";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
import countriesService from "./services/countries";

function App() {
	const [countries, setCountries] = useState([]);
	const [filter, setFilter] = useState("");

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	useEffect(() => {
		countriesService
			.getAll()
			.then((countries) => setCountries(countries))
			.catch((_) => console.log("Failed to fetch countries."));
	}, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()),
  );

	return (
		<div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {filter && <Countries countries={filteredCountries} setFilter={setFilter}/>}
		</div>
	);
}

export default App;
