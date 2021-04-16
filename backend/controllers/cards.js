/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"]}] */
const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка валидации данных');
      }
    })
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => {
            res.send(card);
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              throw new BadRequestError('Ошибка валидации данных');
            }
          });
      } else {
        throw new ForbiddenError('Нельзя удалять чужие карточки');
      }
      return res.status(200).send({ card });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => {
      Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user } }, {
        new: true,
      })
        .then((card) => res.send(card))
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new BadRequestError('Ошибка валидации данных');
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => {
      Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
        .then((card) => res.send(card))
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new BadRequestError('Ошибка валидации данных');
          }
        })
        .catch(next);
    })
    .catch(next);
};
