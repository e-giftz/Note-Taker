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
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));


app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    let newNoteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let newNotelength = (newNoteList.length).toString();

    // Assigning property"id" to json object
    newNote.id = newNotelength
    newNoteList.push(newNote);

    // Write data to the db.json file
    fs.writeFileSync('./db/db.json', JSON.stringify(newNoteList));
    res.json(newNoteList);

});

// Add delete route to delete a note
app.delete('/api/notes/:id', (req, res) => {
    let newNoteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteId = (req.params.id).toString();

    newNoteList = newNoteList.filter(notesFilter =>  {
        return notesFilter.id != noteId;
    })

    fs.writeFileSync('./db/db.json', JSON.stringify(newNoteList));
    res.json(newNoteList);
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// Start server to begin listening
app.listen(PORT,() => console.log(`Server listening on PORT ${PORT}`));
  

  