import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes); // guardamos notas en component state
  // const [notes, setNotes] = useState([]) // asi se inicializa sin notas
  const [newNote, setNewNote] = useState("a new note...");
  //para mostrar solamente notas importantes
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    // argumento es evento que se dispara
    event.preventDefault(); // hace que la pagina se recarge
    console.log("button clicked", event.target); // target en este caso es el form

    // una luego de agregar onChange, newNote refleja el current value del input

    // creamos objeto que recibe contenido de newNote
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5, // probabilidad de que la nota sea importante
      // creamos id basado en el numero de notes que haya
      // este metodo funciona porque en esta app no se pueden borrar notas
      id: notes.length + 1, // creamos id basado en el numero de notes que haya
    };

    // concatenamos nota nueva a las notas
    // usamos concatenar porque no se pueden mutar estados directamente
    setNotes(notes.concat(noteObject));
    setNewNote(""); // reseteamos el estado
  };

  const handleNoteChange = (event) => {
    // llamado cada vez que sucede un cambio en input element
    // no ponemeos event.preventDefault, porque con inputs no hay comportamiento default
    // con form si los hay
    console.log(event.target.value); // event ahora corresponde a input
    setNewNote(event.target.value); // event.target.value es el input value del elemento
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {/** notesToShow instead notes, muestra solo importantes*/}
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        {" "}
        {/** event handler */}
        <input value={newNote} onChange={handleNoteChange} />
        {/** app component maneja el comportamiento de input, por eso agregamos onChange*/}
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
