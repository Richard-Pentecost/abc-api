const express = require('express');
const farmController = require('../controllers/farm');
const auth = require('../middlewares/auth');
// const farm = require('../middlewares/farm');

const router = express.Router();

router.post('/', auth, farmController.create);
router.get('/', auth, farmController.list);
router.get('/list', auth, farmController.listAll);
// router.get('/:farmId', farmController.find);
router.patch('/:farmId', auth, farmController.update);
router.delete('/:farmId', auth, farmController.delete);

module.exports = router;
