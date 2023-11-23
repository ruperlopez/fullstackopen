const express = require("express");
const app = express();
const cors = require("cors");

// middleware para imprimir info acerca de los request que mandamos al servidor
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

// middleware para agarrar request hecho a rutas no existentes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(cors());
// el orden de estos middlewares tiene que ser asi
app.use(express.json()); // json-parser: es un middleware que importamos
app.use(requestLogger); // inicializamos middle ware creado por nosotros

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

// fetching single resource
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id); // pasamos de string a number
  const note = notes.find((note) => note.id === id);

  // esto va en condicional, para que si se busca una nota que no esta de error
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// Deleting resources
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end(); // si se borra respondemos con 204, tmb podria ser 404
});

// helper function for receiving data
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

// receiving data
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content, // data obligatoria
    important: body.important || false, // si no esta esta data va falso
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

app.use(unknownEndpoint);

// listening to port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
