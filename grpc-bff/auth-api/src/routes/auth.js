const express = require('express');

const { getUserRoles } = require('../controllers/roles.js');

const router = express.Router();

router.get('/roles/:userId', getUserRoles);

module.exports = router;
