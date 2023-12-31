const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, doesUserExists, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), doesUserExists);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/[www]*[a-z0-9-._~:/?#\\@!$&'()*+,;=]+[.ru]*/),
  }),
}), updateAvatar);


module.exports = router;
