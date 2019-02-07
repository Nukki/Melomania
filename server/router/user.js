const express = require('express');
const router = express.Router();
const util = require('../util');
const chalk = require('chalk');


router.post('/create', (req, res) => {
  util.createUser(req.body.name, (result) => {
    res.json({ data: result });
  })
});

router.post('/update', (req, res) => {
  util.updateUserScore(req.body.name, req.body.score, (result) => {
    res.json({ data: result });
  })
});

router.post('/checkAnswer', (req, res) => {
  util.check(req.body.answer, req.body.genreCode, req.body.playlistIndex, (result) => {
    res.json({ data: result });
  });
});

router.get('/leaderboard', (req, res) => {
  util.getTop20((top20) => {
   res.json({ data: top20 })
  })
});

router.get('/newSong', (req, res) => {
  util.pickSongAndAnswerOptions((songAndAnswerOptions) => {
    res.json({ data: songAndAnswerOptions });
  });
});

module.exports = router
