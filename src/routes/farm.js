const express = require('express');
const farmController = require('../controllers/farm');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, farmController.create);
router.get('/', farmController.list);

module.exports = router;
