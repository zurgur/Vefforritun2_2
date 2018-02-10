const express = require('express');

const router = express.Router();

const { check, validationResult } = require('express-validator/check');


function form(req, res) {
  const data = [];
  res.render('form', { values: data });
}
function register(req, res) { // eslint-disable-line
  console.info('register');
}
router.get('/', form);

router.post(
  '/',
  check('name').isLength({ min: 1 }).withMessage('Nafn má ekki vera tómt'),
  check('email').isLength({ min: 1 }).withMessage('Netfang má ekki vera tómt'),
  check('email').isEmail().withMessage('Netfang verður að vera netfang'),
  check('ssn').isLength({ min: 1 }).withMessage('Kennitala má ekki vera tóm'),
  check('ssn').matches(/^[0-9]{6}-?[0-9]{4}$/).withMessage('Kennitala verður að vera á formi 000000-0000'),
  check('fjoldi').isInt().withMessage('fjöldi verður að vera heiltala'),
  check('fjöldi').isLength({ min: 1 }).withMessage('tala má ekki vera tóm'),

  (req, res) => {
    const {
      name = '',
      email = '',
      ssn = '',
      fjoldi = '',
    } = req.body;

    let data = {};
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(i => i.msg);
      data = errorMessages;
    }
    res.render('form', { values: data });
  },
);

module.exports = router;
