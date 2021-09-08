const express = require('express');

const { getUserEducation } = require('../controllers/education.js');

const router = express.Router();

router.get('/:userId', getUserEducation);

module.exports = router;
