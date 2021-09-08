const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

const swaggerDocument = yaml.load(fs.readFileSync(`${__dirname}/swagger.yaml`, 'utf8'));
const users = require('./routes/users.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use('/api/users', users);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 3000;

app.listen(port, () => {
  console.info(`Users API Server is up and running on port numner ${port}`);
});

module.exports = app;
