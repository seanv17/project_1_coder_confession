var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/coderconfession");

module.exports.Alias = require('./alias.js');
