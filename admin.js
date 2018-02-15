const express = require('express');

const router = express.Router();
const { Client } = require('pg');

const connectionString = 'postgres://postgres:postgres@localhost/postgres';

const client = new Client({
  connectionString,
});

client.connect();

async function select() { // eslint-disable-line
  let res;
  try {
    res = await client.query('SELECT * FROM form');
    // console.info(res.rows);
  } catch (e) {
    console.error('Error selecting', e);
  }

  await client.end();
  return res.rows;
}

async function getInfo() {
  const rawdata = await select();
  const len = rawdata.length;
  const data = [];
  for (let i = 0; i < len; i += 1) {
    data.push(Object.values(rawdata[i]));
  }
  return data;
}

async function admin(req, res, next) {
  console.log('einhvað shit');
  const data = await getInfo();
  res.send('diplayInfo');
}


function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

router.get('/', ensureLoggedIn, admin);

router.use('/test', admin);
router.get('test', admin);

module.exports = router;
