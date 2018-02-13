
const express = require('express');

const router = express.Router();
const { Client } = require('pg');

const connectionString = 'postgres://postgres:postgres@localhost/postgres';

const client = new Client({
  connectionString,
});

async function select() { // eslint-disable-line
  client.connect();
  let res;
  try {
    res = await client.query('SELECT * FROM form');
    console.info(res.rows);
  } catch (e) {
    console.error('Error selecting', e);
  }

  await client.end();
  return res.rows;
}


function checkLogin(req, res) {
  res.render('logIn');
}
async function login(req, res) {
  const rawdata = await select();
  const len = rawdata.length;
  // console.log(len);
  const data = [];
  for (let i = 0; i < len; i += 1) {
    data.push(Object.values(rawdata[i]));
  }
  // console.info(data);
  res.render('diplayInfo', { values: data });
}

router.get('/', checkLogin);
router.post('/', login);

module.exports = router;
