const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '64938caf297880030df4781c',
  };

  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${PORT}`);
});
