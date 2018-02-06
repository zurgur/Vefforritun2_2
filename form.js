const express = require('express');

const router = express.Router();

function form(req, res) {
  const data = {};
  res.render('form', { data });
}
function register(req, res){
  console.log("register");
}

router.get('/', form);

router.post('submit', register);

module.exports = router;
