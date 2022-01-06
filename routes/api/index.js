const path = require('path');
const router = require('express').Router();
const { notes } = require('../../db/db.json')
const { createNewNote, updateDb } = require('../../lib/notes')

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../db/db.json'));
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    const note = createNewNote(req.body, notes);

    res.json(req.body);
})


router.delete('/notes/:id', (req, res) => {
    const note = notes.find(n => n.id == parseInt(req.params.id));
    if (!note) return res.status(404).send('The note with the given ID is not found')

    const index = notes.indexOf(note);
    notes.splice(index, 1);
    updateDb(notes)

    res.send(note);
})

module.exports = router;