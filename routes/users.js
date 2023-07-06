const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, doesUserExists, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), doesUserExists);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);


module.exports = router;
