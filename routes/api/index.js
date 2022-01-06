const path = require('path');
const router = require('express').Router();
const { notes } = require('../../db/db.json')
const { createNewNote, updateDb } = require('../../lib/notes')
const { v4: uuidv4 } = require('uuid')

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../db/db.json'));
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4()

    const note = createNewNote(req.body, notes);

    res.json(req.body);
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