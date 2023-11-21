import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(()=> {
    axios
    .get("http://localhost:3001/persons")
    .then(response=>{
        setPersons(response.data);
      })
  },[]);

  const addPerson = (event) => {
    event.preventDefault();

    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase(),
      )
    ) {
      return alert(`${newName} is already added to phonebook`);
    }
    const newPerson = {name: newName, number: newNumber};

    axios
      .post("http://localhost:3001/persons", newPerson)
      .then((response) => setPersons([...persons, response.data]));

    setNewName("");
    setNewNumber("");
  };


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2> add a new </h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </>
  );
};

export default App;
