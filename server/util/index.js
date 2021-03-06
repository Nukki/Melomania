const chalk = require('chalk');
const axios = require('axios');
const Song = require('../models/Song');
const User = require('../models/User');

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

module.exports = {

  // inserts an Apple Music playlist into db
  // @playlist Apple Music API playlist id, string
  // @genreCode a string that represents a genre
  populateTable: (playlist, genreCode) => {
    const musicApiRoot = 'https://api.music.apple.com/v1/catalog/us/playlists';
    return axios.get(`${musicApiRoot}/${playlist}`, {
       headers: { Authorization: `Bearer ${process.env.MUSIC_API_TOKEN}`}
     })
      .then((result) => {
        const songList = Object.entries(result.data.data[0].relationships.tracks.data);
        songList.forEach( async (entry, i) => {
          // construct a new song object
          const playlistIndex = entry[0];
          const appleMusicCatalogId = entry[1].id;
          let artist;
          if (genreCode === '05') {
            artist = entry[1].attributes.composerName;
          } else {
            artist = entry[1].attributes.artistName;
          }
          const songName = entry[1].attributes.name;
          const songUrl = entry[1].attributes.previews[0].url;
          const newSong = {
            playlistIndex,
            appleMusicCatalogId,
            artist,
            songName,
            songUrl,
            genreCode,
          }
           // put a new song object into database
          await Song.create(newSong, (err, sng) => {
             if (err) return err;//handleError(err);
              // saved
              console.log(`saved ${sng.songName} ${sng.artist}`);
           });

        });
      })
      .catch( (error) => console.log(chalk.red(error)) )
  },


  // selects a random song of random genre from db
  // passes result object to callback
  // answer options are made up of random artist names in the same genre
  pickSongAndAnswerOptions: (callback) => {
    let songAndAnswerOptions = { // the result object
      songUrl: '',
      answerOptions: [],
      genreCode: '',
      playlistIndex: -1,
    }
    let songCount = 0;

    // select a song genre
    const genres = ['00', '01', '02', '03', '04', '05', '06', '07', '08'];
    const selectedGenre = genres[Math.floor(Math.random() * genres.length)];

    // get the number of songs in this genre
    Song.countDocuments({ genreCode: selectedGenre })
    .then((count) => {
      songCount = count;
      const selectedPlaylistIndex = Math.floor(Math.random() * count);

      Song.findOne({ // find a song at selected index
        playlistIndex: selectedPlaylistIndex,
        genreCode: selectedGenre }, {
        '_id': 0, '__v': 0, // exclude these fields
      })
      .then((sng) => { // got the song
        songAndAnswerOptions.songUrl = sng.songUrl;
        songAndAnswerOptions.genreCode = selectedGenre;
        songAndAnswerOptions.playlistIndex = selectedPlaylistIndex;

        // generate answer options
        const rightAnswer = sng.artist;
        let optionsArray = [];
        // const randIndex1 = Math.floor(Math.random() * songCount)
        // const randIndex2 = Math.floor(Math.random() * songCount)
        // const randIndex3 = Math.floor(Math.random() * songCount)

        Song.find({ genreCode: selectedGenre }, 'artist', (err, ppl) => {
          if (err) return err;
          // generate wrong ansewrs
          let optionsCounter = 0;
          while (optionsCounter < 3) {
            let index = Math.floor(Math.random() * songCount);
            let option = ppl[index].artist;
            if (optionsArray.includes(option) === false && option !== rightAnswer) {
              optionsArray.push(option);
              optionsCounter++;
            }
          }
          // optionsArray.push(ppl[randIndex1].artist);
          // optionsArray.push(ppl[randIndex2].artist);
          // optionsArray.push(ppl[randIndex3].artist);
          // insert right answer
          const rightAnswerIndex = Math.floor(Math.random() * 4);
          optionsArray.splice(rightAnswerIndex, 0, rightAnswer);
          console.log(optionsArray);
          songAndAnswerOptions.answerOptions = optionsArray;
          callback(songAndAnswerOptions);
        });
      }) // end inner then
    }) // end outer then
    .catch((err) => console.log("error in picking a song ", err));
  },

  // checks if the user guess is correct
  // @artist is the artists that the user picked, string
  // @genreCode is genre of a song in question, string
  // @playlistIndex index of the song in the genre playlist, number
  check: (artist, genreCode, playlistIndex, callback) => {
    Song.findOne({ playlistIndex, genreCode }, (err, sng) => {
      let plusScore = 0;
      if (sng.artist === artist) { // correct guess
        // give more points for classical music
        plusScore = genreCode === '05' ? 2 : 1;
        const { artist, songName } = sng;
        callback({right: true, plusScore, artist, songName });
      } else { // incorrect guess
        const { artist, songName } = sng;
        callback({ right: false, plusScore, artist, songName });
      }
    });
  },

  // create a db entry with unique user name
  // @name string of new user name, string
  createUser: (name, callback) => {
    if (!name) {
      callback({ error: 'Username cannot be empty' });
    }
    else if (name.length > 15) {
      callback({ error: 'Name too long. Try something shorter' });
    }
    else {
      const usr = new User({ name, score: 0 });
      usr.save((err, u) => {
        const result = err ? { error: 'This username is already taken' } : u;
        callback(result);
      });
    }
  },

  // @name user to update, string
  // @score new score to insert, number
  updateUserScore: (name, score, callback) => {
    User.findOne({ name }, (err, usr) => {
      if (err) callback({ error: 'could not update user'});
      usr.score = score;
      usr.save((err, u) => {
        const result = err ? { error: 'could not save score' } : { msg: 'success!'};
        callback(result);
      });
    });
  },


  getTop10: (callback) => {
    User.find().sort([['score', 'descending']]).limit(10)
    .then((users) =>  callback(users))
    .catch((err) => callback({ error: 'could not get top 10'}))

  },
}
