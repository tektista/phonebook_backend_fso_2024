const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let phonebook = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/", (request, response) => {
  response.send(`
  <p>Phonebook has info for ${phonebook.length} people</p>
  <p>${new Date().toISOString()}</p>
  `);
});

app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(person => person.id !== id)
  
    response.status(204).end()
  })

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/api/persons", (request, response) => {

    console.log(request.body);

    const found = phonebook.find((person) => person.name.toLowerCase() === request.body.name.toLowerCase());

    if (found) {
        response.status(400).json({
            error: 'name must be unique'
        });
    }

    const newPerson = {
        name: request.body.name,
        number: request.body.number,
        id: Math.floor(Math.random() * 1000),
    }

    phonebook.push(newPerson);

    response.status(200).json(newPerson);
});