var db = require("./models");

var aliasList = [
            {
              name: 'anonymous2KD02J',
              emailAddress: 'john@john.com',
              confession: ['I copy and paste from StackOverFlow.']
            },
            {
              name: 'anonymousDHOD82',
              emailAddress: 'sean@sean.com',
              confession: ['I wish I could learn coding like Neo learns Kung-Fu.']
            },
            {
              name: 'anonymousF9J2OS',
              emailAddress: 'joe@joe.com',
              confession: ['I rely on adapting other peoples code.']
            },
            {
              name: 'anonymousF302JS',
              emailAddress: 'missy@missy.com',
              confession: ['I hate CSS.']
            }
          ];


db.Alias.remove({}, function(err, aliases){

  db.Alias.create(aliasList, function(err, aliases){
    if (err) { return console.log('ERROR', err); }
    console.log("all aliases:", aliases);
    console.log("created", aliases.length, "aliases");
    process.exit();
  });

});
