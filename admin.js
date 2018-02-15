const express = require('express');

const router = express.Router();
const { Client } = require('pg');

const connectionString = 'postgres://postgres:postgres@localhost/postgres';

const client = new Client({
  connectionString,
});

async function select() { // eslint-disable-line
  await client.connect();
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

async function getInfo() {
  const rawdata = await select();
  const len = rawdata.length;
  const data = [];
  for (let i = 0; i < len; i += 1) {
    data.push(Object.values(rawdata[i]));
  }
  return data;
}

module.exports = getInfo();
module.exports = router;
