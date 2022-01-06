const path = require('path');
const router = require('express').Router();
const { notes } = require('../../db/db.json')
const createNewNote = require('../../lib/notes')

router.get('/notes', (req, res) => {
    req.sendFile(path.join(__dirname, '../../db/db.json'));
});

router.post('/notes', (req, res) => {
    // req.body.id = notes.length.toString();

    const note = createNewNote(req.body, notes);
    console.log(req.body)
    res.json(req.body);
})

module.exports = router;