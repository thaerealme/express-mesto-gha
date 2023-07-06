const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
// celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required.email(),
//     password: Joi.string().required(),
//     name: Joi.string().required.min(2).max(30),
//     about: Joi.string().required.min(2).max(30),
//     avatar: Joi.string().required.min(2),
//   }),
// })

const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

// module.exports.ERROR_NOT_FOUND = 404;
// module.exports.ERROR_INVALID = 400;
// module.exports.ERROR_DEFAULT = 500;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.post('/signin', login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    avatar: Joi.string().pattern(/https?:\/\/[www]*[a-z0-9-._~:/?#\\@!$&'()*+,;=]+[.ru]*/),
  }).unknown(false),
}), createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Такой страницы не существует' });
});

app.use(errors());

app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${PORT}`);
});
