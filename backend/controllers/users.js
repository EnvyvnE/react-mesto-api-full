/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"]}] */
/* eslint no-unused-vars: "error" */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const UnuniqueEmailError = require('../errors/ununique-email-error');

const User = require('../models/user');

const handleError = (err) => {
  if (err.name === 'MongoError') {
    throw new UnuniqueEmailError('Указанная почта уже используется');
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new BadRequestError(err.message);
  }
};

const handleIdNotFound = () => {
  throw new NotFoundError('Нет пользователя с таким id');
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      handleIdNotFound();
    })
    .then(({ _id }) => {
      User.findById(_id)
        .then((user) => res.send(user))
        .catch((err) => handleError(err))
        .catch(next);
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      handleError(err);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((({ _id }) => User.findById(_id)))
    .then((user) => {
      res.send({ data: user.toJSON() });
    })
    .catch((err) => {
      handleError(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({
        _id: user._id,
      },NODE_ENV === 'production' ?  JWT_SECRET : 'dev', { expiresIn: '7d' });
      res.status(200).send({ message: 'Авторизация прошла успешно', email: user.email, token });
    })
    .catch((err) => {
      throw new UnauthorizedError(err.message);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about },
    { new: true, runValidators: true, upsert: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      handleError(err);
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      handleError(err);
    })
    .catch(next);
};
