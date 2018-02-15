
const express = require('express');

const router = express.Router();

const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const xss = require('xss');

const { Client } = require('pg');

const connectionString = 'postgres://postgres:postgres@localhost/postgres';
const query = 'INSERT INTO form(name, email, ssn, amount) VALUES($1, $2, $3, $4) RETURNING *';


const client = new Client({
  connectionString,
});

async function insert(values) {
  client.connect();
  try {
    const res = await client.query(query, values);
    console.info(res.rows);
  } catch (err) {
    console.error(err);
  }

  await client.end();
}

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
  check('fjoldi').isInt({ min: 1 }).withMessage('fjöldi verður að vera heiltala'),

  (req, res) => {
    const {
      name = '',// eslint-disable-line
      email = '',// eslint-disable-line
      ssn = '',// eslint-disable-line
      fjoldi = '',// eslint-disable-line
    } = req.body;
    let correctInfo = matchedData(req);
    let data = {};
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(i => i.msg);
      data = errorMessages;
      res.render('form', { values: data, info: correctInfo });
    } else {
      correctInfo = xss(Object.values(correctInfo));
      correctInfo = correctInfo.split(',');
      insert(correctInfo);
      res.render('confirm');
    }
  },
);

// insert().catch(e => console.error(e));
// select().catch(e => console.error(e));
module.exports = router;
