const express = require('express');
const farmController = require('../controllers/farm');
const auth = require('../middlewares/auth');
// const farm = require('../middlewares/farm');

const router = express.Router();

router.post('/', auth, farmController.create);
router.get('/', farmController.list);
// router.get('/:farmId', farmController.find);
router.patch('/:farmId', auth, farmController.update);
router.delete('/:farmId', auth, farmController.delete);

module.exports = router;
