const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

const swaggerDocument = yaml.load(fs.readFileSync(`${__dirname}/swagger.yaml`, 'utf8'));
const users = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use('/api/users', users);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 3000;

app.listen(port, () => {
  console.info(`Server is up and running on port numner ${port}`);
});

module.exports = app;
