var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var ConfessionSchema = new Schema({
  submission: String
});


var Confession = mongoose.model('Confession', ConfessionSchema);
module.exports = Confession;
