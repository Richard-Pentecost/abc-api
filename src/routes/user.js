const express = require('express');
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, userController.create);
router.get('/', auth, userController.list);
// router.patch('/:userId', auth, userController.update);
router.delete('/:userId', auth, userController.delete);

module.exports = router;
