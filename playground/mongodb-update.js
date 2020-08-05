//const MongoClient = require('mongodb').MongoClient;


const {MongoClient, ObjectID} = require('mongodb'); // object de-structuring


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if(err) {
        return console.log('unable to connect to MongoDB server');
    }

    console.log('connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5f280d8c60e67c4e5f5be6ba')},
    //     { $set: {
    //         name: 'chiling at home'
    //     }},
    //     {
    //         returnOriginal: false
    //     }).then((result) => {
    //         console.log(JSON.stringify(result, undefined, 2));
    //     });


        db.collection('Users').findOneAndUpdate({
            _id: new ObjectID('5f280d6edd97134e38ca09b7')},
            { $set: {
                name: 'Amar'
            },

            $inc: {
                age: 2
            }
        },
           
            {
                returnOriginal: false
            }).then((result) => {
                console.log(JSON.stringify(result, undefined, 2));
            });


    client.close();
});