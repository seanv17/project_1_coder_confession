var db = require("./models");

var aliasList = [
            {
              name: 'anonymous2KD02J',
              emailAddress: 'john@john.com'
            },
            {
              name: 'anonymousDHOD82',
              emailAddress: 'sean@sean.com'
            },
            {
              name: 'anonymousF9J2OS',
              emailAddress: 'joe@joe.com'
            },
            {
              name: 'anonymousF302JS',
              emailAddress: 'missy@missy.com'
            }
          ];

/*var confessionList = [
            {
              submission: 'I copy and paste from StackOverFlow.'
            },
            {
              submission: 'I wish I could learn coding like Neo learns Kung-Fu.',
            },
            {
              submission: 'I rely on adapting other peoples code.',
            },
            {
              submission: 'I hate CSS.',
            }
          ];*/


db.Alias.remove({}, function(err, aliases){

  db.Alias.create(aliasList, function(err, aliases){
    if (err) { return console.log('ERROR', err); }
    console.log("all aliases:", aliases);
    console.log("created", aliases.length, "aliases");
    process.exit();
  });

});
