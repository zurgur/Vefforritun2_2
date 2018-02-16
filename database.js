const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/postgres';

const query = 'INSERT INTO form(name, email, ssn, amount) VALUES($1, $2, $3, $4) RETURNING *';

async function insert(values) {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const res = await client.query(query, values);
    console.info(res.rows);
  } catch (err) {
    console.error(err);
  }

  await client.end();
}

async function select() { // eslint-disable-line
  const client = new Client({ connectionString });
  let res;
  try {
    await client.connect();
    res = await client.query('SELECT * FROM form');
    // console.info(res.rows);
  } catch (e) {
    console.error('Error selecting', e);
  }

  await client.end();
  return res.rows;
}

module.exports = {
  selectfromDb: select,
  insertToDb: insert,
};
