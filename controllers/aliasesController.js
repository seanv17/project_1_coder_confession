/************
 * DATABASE *
 ************/

var db = require('../models');

// GET /api/aliases
function index(req, res) {
  db.Alias.find({}, function(err, allAliases) {
    if (err) { return console.log('does not compute' + err);}
    res.json(allAliases);
  });
}

function create(req, res) {
  // FILL ME IN !
}

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
}

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
