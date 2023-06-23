const User = require('../models/user');
const { ERROR_NOT_FOUND, ERROR_INVALID, ERROR_DEFAULT } = require('../app');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_INVALID).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.doesUserExists = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Пользователь по указанному ID не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_INVALID).send({ message: 'Пользователь по указанному ID не найден' });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_INVALID).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному ID не найден' });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_INVALID).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному ID не найден' });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};
