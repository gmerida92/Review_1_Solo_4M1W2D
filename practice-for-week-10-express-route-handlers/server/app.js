// Phase 2
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

app.get('/artists', (req, res, next) => {
  let allArtists = getAllArtists();
  return res.json(allArtists);
})

app.post('/artists', (req, res, next) => {
  let newArtist = req.body
  // console.log(newArtist, req.body)
  res.status(201)
  return res.json(addArtist(newArtist))
})

app.get('/artists/latest', (req, res, next) => {
  let latestArtist = getLatestArtist();
  res.status(200);
  return res.json(latestArtist)
})

app.get('/artists/latest/albums', (req, res, next) => { 
  let albumFromLatestArtist = getAlbumsForLatestArtist();
  res.status(200);
  return res.json(albumFromLatestArtist);
})

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}