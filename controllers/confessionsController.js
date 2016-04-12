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

// Delete a confession submission associated with an alias
// app.delete('/api/aliases/:aliasId/confessions/submission/:submissionId', controllers.confessions.destroy);
function destroy(req, res) {
  var aliasId = req.params.aliasId;
  var submissionId = req.params.submissionId;
  db.Alias.findById(aliasId, function(err, foundAlias) {
    console.log('foundAlias: ', foundAlias);
    var trashedSubmission = foundAlias.confessions.id(req.params.submissionId);
    console.log('trashedSubmission: ', trashedSubmission);
    if (trashedSubmission) {
      trashedSubmission.remove();
      // save new alias with trashed submission
    foundAlias.save(function(err, saved) {
      console.log('Deleted ', trashedSubmission.name, 'from', saved.submission);
      res.json(trashedSubmission);
    });
    }
   else {res.send(404);}
  });
}

// Update a submission within an alias
// app.put('/api/aliases/:aliasId/confessions/submission/:submissionId', controllers.confessions.update);
function update(req, res) {
  console.log(req.body);
   var aliasId = req.body.aliasId;
   var submissionId = req.body.submissionId;
   var newText = req.body.newText;

  db.Alias.findById(aliasId, function(err, foundAlias) {
    console.log('foundAlias:', foundAlias);
    var correctSubmission = foundAlias.confessions.id(submissionId);

    if (correctSubmission) {
    // Set foundAlias submission value to submitted submission value user
    correctSubmission.submission = newText;
    // Save updated submission and set to 'savedAlias'
    foundAlias.save(function(err, savedAlias) {
      if (err) {return console.log('Save Error: ', err);} //saves the entire alis with the edited trip
      res.json(savedAlias);
    });
    }
  });
}

// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
