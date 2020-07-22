const express = require('express');
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, userController.create);
router.get('/', auth, userController.list);
router.get('/:userId', auth, userController.find);
router.delete('/:userId', auth, userController.delete);
router.patch('/:userId/profile', auth, userController.updateUser);
router.patch('/:userId/security', auth, userController.updatePassword);

module.exports = router;
