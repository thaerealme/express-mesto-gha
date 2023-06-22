const router = require('express').Router();
const {
  getUsers, createUser, doesUserExists, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', doesUserExists);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);


module.exports = router;
