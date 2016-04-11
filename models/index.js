var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/coderconfession" );

module.exports.Alias = require('./alias.js');
module.exports.Confession = require('./confession.js');
