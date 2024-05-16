const router = require('express').Router();

// importing modular router for /notes
const notesRouter = require('./notes');

router.use('/api/notes', notesRouter);

module.exports = router;
