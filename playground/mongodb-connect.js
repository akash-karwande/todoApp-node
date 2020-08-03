//const MongoClient = require('mongodb').MongoClient;


const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if(err) {
        return console.log('unable to connect to MongoDB server');
    }

    console.log('connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     name: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('unable to insert the todos',err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Amit',
        age: 23,
        location: 'Basmath'
    }, (err, result) => {
        if(err) {
            return console.log('unable to add the user')
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});