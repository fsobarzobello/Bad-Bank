const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    console.log("Connected successfully to server");

    //database name
    const dbName = 'myproject';
    const db = client.db(dbName);

    //new user
    var name = 'user' + Math.floor(Math.random() * 1000);
    var email = name + '@mit.edu';

    //insert into customer table
    var collection = db.collection('customers');
    var doc = {name,email};
    collection.insertOne(doc, {writeConcern: {w:1}}, function(err, result) {
        console.log('Document insert');
    });

    var customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs) {
            console.log('Collection',docs);

            //clean up
            client.close();
        });

});

