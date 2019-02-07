const chalk = require('chalk');
const axios = require('axios');
const Song = require('../models/Song');

module.exports = {

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
        const randIndex1 = Math.floor(Math.random() * songCount)
        const randIndex2 = Math.floor(Math.random() * songCount)
        const randIndex3 = Math.floor(Math.random() * songCount)

        Song.find({ genreCode: selectedGenre }, 'artist', (err, ppl) => {
          if (err) return err;
          optionsArray.push(ppl[randIndex1].artist);
          optionsArray.push(ppl[randIndex2].artist);
          optionsArray.push(ppl[randIndex3].artist);
          const rightAnswerIndex = Math.floor(Math.random() * 4);
          optionsArray.splice(rightAnswerIndex, 0, rightAnswer);
          songAndAnswerOptions.answerOptions = optionsArray;
          callback(songAndAnswerOptions);
        });
      }) // end inner then
    }) // end outer then
    .catch((err) => console.log("error in picking a song ", err));
  },


  checkAnswer: (artist, genreCode, playlistIndex) => {
    console.log('lol');
    // how many points to add.
    // if classical music ==> add 2
  },
}
