//const MongoClient = require('mongodb').MongoClient;


const {MongoClient, ObjectID} = require('mongodb'); // object de-structuring


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if(err) {
        return console.log('unable to connect to MongoDB server');
    }

    console.log('connected to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('Todos').find({
        _id: new ObjectID('5f269552a4c6d83c624f3d78')
    }).toArray().then((doc) =>{
        console.log(JSON.stringify(doc, undefined, 2));
    }, (err) => {
        console.log('not able to find todos',err);
    });


    client.close();
});