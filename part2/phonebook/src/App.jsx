import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons.js"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(()=> {
    personService.getAll().then(persons=>{
        setPersons(persons);
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

    personService
      .create(newPerson)
      .then((person) => setPersons([...persons, person]));

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = ((person) => {
    if(!window.confirm(`Delete ${person.name}?`)) return; 
    personService
    .remove(person.id)
    .then((_)=> setPersons(persons.filter((p) => p.id !== person.id)))
    .catch((_) => alert(`Error deleting ${person.name}`))
  })
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
      <Persons persons={filteredPersons} handleDelete={handleDelete}/>
    </>
  );
};

export default App;
