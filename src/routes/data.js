const express = require('express');
const dataController = require('../controllers/data');
const auth = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.post('/', auth, dataController.create);
router.get('/', dataController.list);
router.patch('/:dataId', auth, dataController.update);
router.delete('/:dataId', auth, dataController.delete);

module.exports = router;
