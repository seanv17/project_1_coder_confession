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

// POST /api/aliases
function create(req, res) {

  // set the value of the new Alias
  var newAlias = {
    name: req.body.name,
    emailAddress: req.body.emailAddress
  };

  db.Alias.find(newAlias, function isFound(err, found) {
    if (err) {return console.log('ERR1: ', err);}
    // if found is empty, this is new alias
    if(found.length===0) {
      console.log('This is a new alias, creating a new db entry...');
      db.Alias.create(newAlias, function newAliasCreated(err, createdAlias) {
        if (err) {return console.log('ERR2: ', err);}
        console.log('Created new Alias');
        createdAlias.confessions.push(new db.Confession({submission: req.body.confession }));
        console.log('New Confessions: ', createdAlias.confessions);
        createdAlias.save(function sendJSON(err, finalAlias) {
          if (err) {return console.log('ERR3: ', err);}
          console.log('Successfully added confession and sending whole new alias');
          res.json(finalAlias);
        });
      });
    }
    // if found (alias) already exists, attach confession to existing alias
    else if (found[0]._id) {
      var aliasId = found[0]._id;
      console.log('req.params.id: ', aliasId);
      var newConfession = req.body.confession;
      console.log('req.body.confession: ', newConfession);
      db.Alias.findById(aliasId)
      .populate('confession')
      .exec(function (err, foundAlias) {
        console.log('foundAlias: ', foundAlias);
        if (err) {return console.log('ERR4: ', err);}
        else {
          foundAlias.confessions.push(new db.Confession({submission: req.body.confession }));
          foundAlias.save();
          res.json(foundAlias);
        }
      });
    }
  });
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
