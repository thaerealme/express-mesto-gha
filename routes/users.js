const router = require('express').Router();

const {
  getUsers, doesUserExists, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', doesUserExists);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);


module.exports = router;
