const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const util = require('../util');

/*
    Restricted routes for developer use only
*/

router.get('/populateSongs', (req, res) => {
  if (req.headers.authorization.split(" ")[1] !== process.env.DEV_ROUTES_TKN) {
    console.log(chalk.red("unauthorized req"));
    res.sendStatus(401);
  } else {
    /*
    Music Genre Codes:
     00 Top 100 USA Now
     01 Classic Rock
     02 '00s Hip-Hop/R&B Essentials
     03 '90s Hip-Hop Essentials
     04 '10s Club Essentials
     05 Classical Music Essentials
     06 Best of 2000 by topsify
     07 '90s Alternative Essentials
     08 '90s Electronic Essentials
    */
    util.populateTable('pl.606afcbb70264d2eb2b51d8dbcfa6a12', '00')
    .then(() => {
      util.populateTable('pl.1a7fd42205674dd282d106f533f4bea6', '01');
    })
    .then(() => {
      util.populateTable('pl.cfc176ebe118487e9e3b192eae75d0c1', '02');
    })
    .then(() => {
      util.populateTable('pl.b1e1fe0c591a4e0cbc3eb0ebcb567705', '03');
    })
    .then(() => {
      util.populateTable('pl.cc13740af0374560ac1c659ca2a89dd8', '04');
    })
    .then(() => {
      util.populateTable('pl.9dc583e20e344cc4bf7dc823abde7a2c', '05');
    })
    .then(() => {
      util.populateTable('pl.324a3b57a22c465b968121584b530a10', '06');
    })
    .then(() => {
      util.populateTable('pl.ea843ef3098747f9815a77adf164e1fc', '07');
    })
    .then(() => {
      util.populateTable('pl.2a95256367dd4edd8f3f450e1e04bed2', '08');
    })
    .catch( (err) => console.log('Oops something rwong in populate'));
    res.sendStatus(201);
  }
});


router.get('/generateJWT', (req, res) => {
  if (req.headers.authorization.split(" ")[1] !== process.env.DEV_ROUTES_TKN) {
    console.log(chalk.red("unauthorized req"));
    res.sendStatus(401);
  } else {
    const cert = fs.readFileSync(path.join(__dirname, '../../cert/Key.p8')) || '';
    const token = jwt.sign({ foo: 'bar' }, cert, {
      algorithm: 'ES256',
      keyid: process.env.MUSIC_KEY_ID,
      issuer: process.env.MY_TEAM_ID,
      expiresIn: '3650h',
    });
    console.log(chalk.cyan(token));
    res.sendStatus(200);
  }
});

module.exports = router
