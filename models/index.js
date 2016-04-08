var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/coderconfession");

module.exports.Alias = require('./alias.js');
module.exports.Confession = require('./confession.js');
