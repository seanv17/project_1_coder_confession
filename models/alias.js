var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Confession = require('./confession.js');

var AliasSchema = new Schema({
  name: String,
  emailAddress: String,
  confessions: [Confession.schema]
});

var Alias = mongoose.model('Alias', AliasSchema);
module.exports = Alias;
