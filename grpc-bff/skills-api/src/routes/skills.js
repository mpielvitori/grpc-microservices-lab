const express = require('express');

const { getUserSkills } = require('../controllers/skills.js');

const router = express.Router();

router.get('/:userId', getUserSkills);

module.exports = router;
