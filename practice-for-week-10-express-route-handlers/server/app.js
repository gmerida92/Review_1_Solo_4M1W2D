// Phase 2
const { restart } = require('nodemon');
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

// Your code here
app.use(express.json())

// app.use((req, res, next) => {
//   console.log('Request Body:', req.body);
//   next();
// });


// README.md: Get all the artists
// npm test test/01-specs.js
app.get('/artists', (req, res, next) => {
  let allArtists = getAllArtists();
  return res.json(allArtists);
})

// README.md: Add an artist
// npm test test/02-specs.js
app.post('/artists', (req, res, next) => {
  let newArtist = req.body
  res.status(201)
  return res.json(addArtist(newArtist))
})

// README-bonus.md: Get the latest artis added
// npm test test/03-specs.js
app.get('/artists/latest', (req, res, next) => {
  let latestArtist = getLatestArtist();
  res.status(200);
  return res.json(latestArtist)
})

// README-bonus.md: Get all albums of the latest artist
// npm test test/04-specs.js
app.get('/artists/latest/albums', (req, res, next) => {
  let albumFromLatestArtist = getAlbumsForLatestArtist();
  res.status(200);
  return res.json(albumFromLatestArtist);
})

// README-long-practice.md: Get a specific artist's details based on artistId
// npm test test/05-specs.js
app.get('/artists/:artistId', (req, res, next) => {
  let { artistId } = req.params;
  let artistById = getArtistByArtistId(artistId);
  res.status(200);
  return res.json(artistById)
})

// README-long-practice.md: Edit a specific artist by artist Id
// npm test test/06-specs.js
app.put('/artists/:artistId', (req, res, next) => {
  let { artistId } = req.params;
  let { name } = req.body;

  let artistEdits = {
    artistId: Number(artistId),
    name: name
  }

  let updatedArtist = editArtistByArtistId(artistId, artistEdits)
  res.status(200);
  return res.json(updatedArtist);
})


app.patch('/artists/:artistId', (req, res, next) => {
  let { artistId } = req.params;
  let { name } = req.body;

  let artistEdits = {
    artistId: Number(artistId),
    name: name
  }

  let updatedArtist = editArtistByArtistId(artistId, artistEdits)
  res.status(200);
  return res.json(updatedArtist);
})


// README-long-practice.md: Delete a specified artist by artist
// npm test test/07-specs.js
app.delete('/artists/:artistId', (req, res, next) => {
  let { artistId } = req.params;
  deleteArtistByArtistId(artistId);
  return res.json({
    message: "Successfully deleted"
  })
})

// README-long-practice.md: Get all albums of a specific artist based on artistId
// npm test test/08-specs.js
app.get('/artists/:artistId/albums', (req, res, next) => {
  let { artistId } = req.params;
  let artistAlbums = getAlbumsByArtistId(artistId);
  res.status(200);
  return res.json(artistAlbums);
})

// README-long-practice.md: Get a specific album's details based on albumId
// npm test test/09-specs.js
app.get('/albums/:albumId', (req, res, next) => {
  let { albumId } = req.params;
  let album = getAlbumByAlbumId(albumId);
  res.status(200);
  return res.json(album)
})

// README-long-practice.md: Add an album to a specific artist based on artistId
// npm test test/10-specs.js
app.post('/artists/:artistId/albums', (req, res, next) => {
  let { artistId } = req.params;
  let { name } = req.body;

  let newAlbum = {
    name: name
  }

  let addingAlbum = addAlbumByArtistId(artistId, newAlbum);
  res.status(201)
  return res.json(addingAlbum);
})

// README-long-practice.md: Edit a specific album by albumId
// npm test test/11-specs.js
app.put('/albums/:albumId', (req, res, next) => {
  let { albumId } = req.params;
  let { name } = req.body;

  let albumEdit = {
    name: name
  };

  let updatedAlbum = editAlbumByAlbumId(albumId, albumEdit);
  res.status(200);
  return res.json(updatedAlbum)

})

app.patch('/albums/:albumId', (req, res, next) => {
  let { albumId } = req.params;
  let { name } = req.body;

  let albumEdit = {
    name: name
  };

  let updatedAlbum = editAlbumByAlbumId(albumId, albumEdit);
  res.status(200);
  return res.json(updatedAlbum)

})

// README-long-practice.md: Delete a specified album by albumId
// npm test test/12-specs.js
app.delete('/albums/:albumId', (req, res, next) => {
  let { albumId } = req.params;
  deleteAlbumByAlbumId(albumId)
  return res.json({
    message: "Successfully deleted"
  })
})

// README-long-practice.md: Get all albums with names filtered by first letter
// npm test test/13-specs.js
app.get('/albums', (req, res, next) => {
  let { startsWith } = req.query;
  let filteredAlbums = getFilteredAlbums(startsWith);
  return res.json(filteredAlbums);
})

// README-long-practice.md: Get a specific song's details based on songId
// npm test test/14-specs.js
app.get('/songs/:songId', (req, res, next) => {
  let { songId } = req.params;
  let song = getSongBySongId(songId);
  res.status(200);
  return res.json(song)
})

// README-long-practice.md: Add a song to a specific album based on albumId
// npm test test/15-specs.js
app.post('/albums/:albumId/songs', (req, res, next) => {
  let { albumId } = req.params;
  let { name, trackNumber, lyrics } = req.body;

  let newSongDetail = {
    name: name,
    trackNumber: trackNumber,
    lyrics: lyrics,
    albumId: albumId
  }

  let newSong = addSongByAlbumId(albumId, newSongDetail);
  res.status(201);
  return res.json(newSong);
})

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}