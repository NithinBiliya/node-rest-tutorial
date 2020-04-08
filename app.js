const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

if (process.env.ENV === 'Test') {
  // eslint-disable-next-line no-console
  console.log('This is a test');
  mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  mongoose.connect('mongodb://localhost/bookAPI');
}

const app = express();
const port = process.env.PORT || 3000;
const Book = require('./models/book');
const bookRouter = require('./routes/book')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port - ${port}`);
});

module.exports = app;
