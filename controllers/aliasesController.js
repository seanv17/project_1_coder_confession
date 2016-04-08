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
  //console.log('what is my input?', req.body);

  // set the value of the list id
  var newAlias = {
    name: req.body.name,
    emailAddress: req.body.emailAddress
  };

  db.Alias.find(newAlias, function isFound(err, found) {
    if(err) {return console.log("ERR: ", err);}
    // if found is empty, this is new
    if(found.length===0){
      console.log("This is a new alias, creating a new db entry...");
      db.Alias.create(newAlias, function newAliasCreated(err, createdAlias) {
        if(err) {return console.log("ERR: ", err);}
        console.log("Created new Alias");
        createdAlias.confessions.push(new db.Confession({submission: req.body.confession }));
        console.log("NEW CONFESSIONS: " , createdAlias.confessions);
        createdAlias.save(function sendJson(err, finalAlias) {
          if(err) {return console.log("ERR: ", err);}
          console.log("SUCCESSFULLY ADDED CONFESSION AND SENDiNG WHOLE NEW ALIAS");
          res.json(finalAlias);
        });
      });
    } // create else case
  });
}
// function create(req, res) {
//   // console.log('what is my input?', req.body);
//   //   var newAlias = new db.Alias({
//   //     name: req.body.name,
//   //     emailAddress: req.body.emailAddress,
//   //   });
//   //
//   // // save newAlias to the database
//   // console.log('this is the new alias', newAlias);
//   // newAlias.save(function(err, alias) {
//   //   if (err) {return console.log('save error:' + err);}
//   //   console.log('save ', alias.name);
//   //
//   // // send back the alias created
//   // res.json(alias);
//   // });
//
//
// }

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
