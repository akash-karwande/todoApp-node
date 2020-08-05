//const MongoClient = require('mongodb').MongoClient;


const {MongoClient, ObjectID} = require('mongodb'); // object de-structuring


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if(err) {
        return console.log('unable to connect to MongoDB server');
    }

    console.log('connected to MongoDB server');

    const db = client.db('TodoApp');

//    // deleteMany
//     db.collection('Todos').deleteMany({name:'Something to do'}).then((result) => {
//         console.log(result);
//     });

//    // deleteOne

//    db.collection('Todos').deleteOne({name:'Something to do'}).then((result) => {
//        console.log(result);
//    });


   // findOneAndDelete

   db.collection('Todos').findOneAndDelete({_id: new ObjectID('5f280d8e42f2484e6de6046c')}).then((result) => {
    console.log(result);
   });




    client.close();
});