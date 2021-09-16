const express = require('express');

const { getAllUsers } = require('../controllers/users.js');

const router = express.Router();

router.get('/all', getAllUsers);

module.exports = router;
