/************
 * DATABASE *
 ************/

var db = require('../models');


// GET /api/albums
function index(req, res) {
  // FILL ME IN !
}

function create(req, res) {
  // FILL ME IN !
}

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
// Delete a confession submission associated with an alias

// Get submission id from url params ('req.params')
var aliasId = req.params.alias_id;
var confessionId = req.params.confession_id;
var submissionId = req.params.submission_id;
console.log('req.params.alias_id, ', aliasId);
console.log('req.params.confession_id, ', confessionId);
console.log('req.params.submission_id, ', submissionId);

}


// Delete a song associated with a album

/*'/api/aliases/:alias_id/confessions/:confession_id/submission/:submission_id'*/
  // Get album id from url params (`req.params`)
/*app.delete('/api/albums/:id', function (req, res) {
  var albumId = req.params.album_id;
  var songId = req.params.song_id;*/
  /*db.Album.findById(albumId)
    .populate('artist')
    .exec(function(err, foundAlbum) {
      if (err) {
        res.status(500).json({error: err.message});
      } else if (foundAlbum === null) {
        res.status(404).json({error: "No Album found by this ID"});
      } else {
        // find the song by id
        var deletedSong = foundAlbum.songs.id(songId);
        // delete the found song
        deletedSong.remove();
        // save the found album with the song deleted
        foundAlbum.save();
        // send back the found album without the song
        res.json(foundAlbum);
      }
    });
});*/

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
