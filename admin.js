const express = require('express');

const router = express.Router();
const database = require('./database.js');
const csv = require('express-csv'); // eslint-disable-line

async function getInfo() {
  const rawdata = await database.selectfromDb();
  const len = rawdata.length;
  const data = [];
  for (let i = 0; i < len; i += 1) {
    data.push(Object.values(rawdata[i]));
  }
  return data;
}

async function admin(req, res) {
  try {
    const data = await getInfo();
    res.render('diplayInfo', { values: data });
  } catch (error) {
    console.error(error);
    res.redirect('/error');
  }
}


function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

async function vista(req, res) {
  const filename = 'test.csv';
  try {
    const data = await database.selectfromDb();
    res.set(
      'Content-Disposition',
      `attachment; filename="${filename}"`,
    );
    res.send(res.csv(data));
  } catch (err) {
    console.error(err);
  }
}

router.get('/', ensureLoggedIn, admin);
router.get('/downlod', ensureLoggedIn, vista);

module.exports = router;
