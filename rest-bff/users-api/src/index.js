/* eslint-disable import/extensions */
const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use('/users', users);

const port = 3000;

app.listen(port, () => {
  console.info(`Server is up and running on port numner ${port}`);
});

module.exports = app;
