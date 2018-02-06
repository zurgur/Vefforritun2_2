const express = require('express');

const router = express.Router();

function form(req, res) {
  const data = {};
  res.render('form', { data });
}
function register(req, res) {
  console.info('register');
  const data = {};
  res.render('form', { data });
}

router.get('/', form);

router.post('/register', register);

module.exports = router;
