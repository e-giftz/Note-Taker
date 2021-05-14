const express = require('express');
const path = require('path');
const fs = require('fs');

// Setting up the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Setting up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Creating the HTML routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// Creating the API routes
app.get('/api/notes', (req, res) => {
    let newNoteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(newNoteList);

    });


app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    let newNoteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    // Remove spaces from the newNote
    //newNote.routeName = newNote.name.replace(/\s+/g,'').toLowerCase();
    console.log(newNote);

    let newNotelength = (newNoteList.length).toString();

    // Assigning property"id" to json object
    newNote.id = newNotelength
    newNoteList.push(newNote);

    // Write data to the db.json file
    fs.writeFileSync('./db/db.json', JSON.stringify(newNoteList));
    res.json(newNoteList);

});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// Start server to begin listening
app.listen(PORT,() => console.log(`Server listening on PORT ${PORT}`));
  

  