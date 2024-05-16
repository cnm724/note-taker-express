// 
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index');
const notesRouter = require('./routes/notes')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(clog);

// parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', api);
app.use(notesRouter);

app.use(express.static('public'));

// route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// route for landing page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});