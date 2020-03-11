const express = require('express');
const farmController = require('../controllers/farm');

const router = express.Router();

router.post('/', farmController.create);

module.exports = router;
