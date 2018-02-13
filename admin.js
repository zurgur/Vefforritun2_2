
const express = require('express');

const router = express.Router();

function checkLogin(req, res) {
  res.render('logIn');
}
function login(req, res) {
  res.render('diplayInfo.pug');
}

router.get('/', checkLogin);
router.post('/', login);

module.exports = router;
