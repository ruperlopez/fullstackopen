import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' } ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    setPersons([...persons, {name: newName}])
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
