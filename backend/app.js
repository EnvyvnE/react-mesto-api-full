/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index.js');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const oprions ={
  origin:['http://localhost:3000',
'http://kv.mesto.nomoredomains.icu',
'https://kv.mesto.nomoredomains.icu',
'http://www.kv.mesto.nomoredomains.icu',
'https://www.kv.mesto.nomoredomains.icu'],
methods:['GET','HEAD','PUT','PATCH','POST','DELETE'],
preflightContinue:false,
optionsSuccessStatus:204,
allowedHeaders:['Content-Type',
'origin','Authorization','authorization'],
credentials:true,
};

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true,
});

app.use('*',cors(options));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

router.use((req) => {
  throw new NotFoundError(`Ресурс по адресу ${req.path} не найден`);
});

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
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
  // eslint-disable-next-line no-console
  console.log('App start');
});
