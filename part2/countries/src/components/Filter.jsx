import React from "react";

const Filter = ({ filter, handleFilterChange }) => {
	return (
		<div>
			<span>Find countries</span>
			<input type="search" onChange={handleFilterChange} value={filter} />
		</div>
	);
};

export default Filter;
