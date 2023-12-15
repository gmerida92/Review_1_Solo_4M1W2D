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
app.get('/artists', (req, res, next) => {
  let allArtists = getAllArtists();
  return res.json(allArtists);
})


// README.md: Add an artist
app.post('/artists', (req, res, next) => {
  let newArtist = req.body
  res.status(201)
  return res.json(addArtist(newArtist))
})

// README-bonus.md: Get the latest artis added
app.get('/artists/latest', (req, res, next) => {
  let latestArtist = getLatestArtist();
  res.status(200);
  return res.json(latestArtist)
})

// README-bonus.md: Get all albums of the latest artist
app.get('/artists/latest/albums', (req, res, next) => {
  let albumFromLatestArtist = getAlbumsForLatestArtist();
  res.status(200);
  return res.json(albumFromLatestArtist);
})

// README-long-practice.md: Get a specific artist's details based on artistId
app.get('/artists/:artistId', (req, res, next) => {
  let { artistId } = req.params;
  let artistById = getArtistByArtistId(artistId);
  res.status(200);
  return res.json(artistById)
})

// README-long-practice.md: Edit a specific artist by artist Id
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
  // console.log(artistId)
  let { name } = req.body;

  let artistEdits = {
    artistId: Number(artistId),
    name: name
  }

  // console.log("HERE1", artistEdits)

  let updatedArtist = editArtistByArtistId(artistId, artistEdits)
  // console.log("HERE2", updatedArtist)
  res.status(200);
  return res.json(updatedArtist);
})

app.delete('/artists/:artistId', (req, res, next) => {
  let { artistId } = req.params;
  deleteArtistByArtistId(artistId);
  return res.json({
    message: "Successfully deleted"
  })
})

app.get('/artists/:artistId/albums', (req, res, next) => {
  let { artistId } = req.params;
  let artistAlbums = getAlbumsByArtistId(artistId);
  res.status(200);
  return res.json(artistAlbums);
})

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

app.delete('/albums/:albumId', (req, res, next) => {
  let { albumId } = req.params;
  // console.log("HERE!", albumId)
  deleteAlbumByAlbumId(albumId)
  return res.json({
    message: "Successfully deleted"
  })
})

app.get('/albums', (req, res, next) => {
  let { startsWith } = req.query;
  // console.log('HERE!', startsWith)
  let filteredAlbums = getFilteredAlbums(startsWith);
  return res.json(filteredAlbums);
})

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}