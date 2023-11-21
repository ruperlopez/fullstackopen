const Persons = ({ persons , handleDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <div key={person.name}>
          {" "}
          {person.name}: {person.number}
          <button onClick={() => handleDelete(person)}> Delete </button>
        </div>
      ))}
    </>
  );
};
export default Persons
