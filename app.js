const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser'); // eslint-disable-line
const session = require('express-session'); // eslint-disable-line

const form = require('./form');
const admin = require('./admin');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', form);
app.use('/admin', admin);


function notFoundHandler(req, res, next) { // eslint-disable-line
  res.status(404).render('error', { title: '404' });
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  res.status(500).render('error', { err });
}

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
