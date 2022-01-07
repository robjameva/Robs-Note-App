const path = require('path');
const router = require('express').Router();
const { notes } = require('../../db/db.json')
const { createNewNote, updateDb, validateNote, findById } = require('../../lib/notes')
const { v4: uuidv4 } = require('uuid')

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../db/db.json'));
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes)
    if (result) {
        res.json(result)
    } else {
        res.sendStatus(404)
    }
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4()

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted')
    } else {
        createNewNote(req.body, notes);
        res.json(req.body);
    }
})


router.delete('/notes/:id', (req, res) => {
    const note = notes.find(n => n.id == req.params.id);
    if (!note) return res.status(404).send('The note with the given ID is not found')

    const index = notes.indexOf(note);
    notes.splice(index, 1);
    updateDb(notes)

    res.send(note);
})

module.exports = router;