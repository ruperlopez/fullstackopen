import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' } ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)){
      return alert(`${newName} is already added to phonebook`)
    }
    setPersons([...persons, {name: newName}])
    setNewName("");
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input type="text" value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     {persons.map((person) => (
      <div key={person.name}> {person.name} </div>
     ))} 
    </>
  )
}

export default App
