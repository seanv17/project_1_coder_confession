var mongoose = require("mongoose"),
    Schema = mongoose.Schema,

    confessionSchema = new Schema({
        submission: String
      });

var AliasSchema = new Schema({
  name: String,
  emailAddress: String,
  confession: [confessionSchema]
});

var Alias = mongoose.model('Alias', AliasSchema);
module.exports = Alias;
