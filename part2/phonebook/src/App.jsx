import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const person = persons.find((person) => person.name === newName);

    let errorMessage = `${newName} is already added to the phonebook.`;

    if (person && newNumber && newNumber !== person.number) {
      if (
        !window.confirm(
          `${errorMessage} Replace the old number with a new one?`,
        )
      ) {
        return;
      }

      const newPerson = { ...person, number: newNumber };

      return personService.update(person.id, newPerson).then((res) => {
        setPersons(
          persons.map((person) => (person.id === newPerson.id ? res : person)),
        );
        setMessage(`Updated number for ${person.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      });
    } else if (person) {
      return alert(errorMessage);
    }

    const newPerson = { name: newName, number: newNumber };

    personService.create(newPerson).then((person) => {
      setPersons([...persons, person])
      setMessage(`Added ${person.name}`);
      setTimeout(()=>{setMessage(null)}, 2000)
    });


    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) return;
    personService
      .remove(person.id)
      .then((_) => setPersons(persons.filter((p) => p.id !== person.id)))
      .catch((_) => alert(`Error deleting ${person.name}`));
      setMessage(`deleted ${person.name}`);
      setTimeout(()=>{setMessage(null)}, 2000)
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
      <Notification message={message} />
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
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </>
  );
};

export default App;
