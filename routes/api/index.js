const express = require('express');
const router = express.Router();

router.use('/user', require('./users'));
router.use('/contact', require('./contacts'));

module.exports = router;
