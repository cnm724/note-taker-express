const router = require('express').Router();

const notesRouter = require('./notes');

router.use('/api/notes', notesRouter);

module.exports = router;
