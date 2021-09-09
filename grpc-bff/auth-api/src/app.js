const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

const swaggerDocument = yaml.load(fs.readFileSync(`${__dirname}/swagger.yaml`, 'utf8'));
const auth = require('./routes/auth.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use('/api/auth/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', auth);

const port = 3000;

app.listen(port, () => {
  console.info(`Auth API Server is up and running on port numner ${port}`);
});

module.exports = app;
