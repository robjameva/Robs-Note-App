const fs = require('fs');
const path = require('path');

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )
    return note;
}

function updateDb(notesArray) {
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') return false;
    if (!note.text || typeof note.text !== 'string') return false;
    return true;
}

function findById(id, notesArray) {
    return notesArray.filter(note => note.id === id)[0];
}

module.exports = { createNewNote, updateDb, validateNote, findById };