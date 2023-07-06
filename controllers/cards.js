const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const InvalidError = require('../errors/invalid-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new InvalidError('Переданы некорректные данные для создания карточки');
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным ID не найдена');
      }
      if (String(req.user._id) !== String(card.owner)) {
        const error = new Error('Нет полномочий для удаления карточки');
        error.statusCode = 403;
        next(error);
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((deleted) => {
          res.send(deleted);
        })
        .catch((next));
    })
    .catch((next));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным ID не найдена');
      }
      res.send(card);
    })
    .catch(() => {
      throw new NotFoundError('Указан некорректный ID');
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным ID не найдена');
      }
      res.send(card);
    })
    .catch(() => {
      throw new NotFoundError('Указан некорректный ID');
    })
    .catch(next);
};
