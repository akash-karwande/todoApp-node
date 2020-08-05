var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
   var todo = new Todo({
    name: req.body.name,
    completed: req.body.completed,
    completedAt: req.body.completedAt
   });

   todo.save().then((doc) =>{
       res.send(doc);
   }, (err) => {
        res.status(400).send(err);
   });
});

app.get('/todos',(req, res) => {
    Todo.find().then((todos) => {
        res.send(todos);
    }, (err) => {
        res.status(400).send(err);
    })
})

app.get('/todos/:id', (req, res) => {
   var id = req.params.id;

   if(!ObjectID.isValid(id)) {
       return res.status(404).send();
   }

   Todo.findById(id).then((todo) => {
       if(!todo) {
           return res.status(404).send();
       }
        res.send({todo});
   }).catch((err) => {
        res.status(400).send(err);
   });

});
app.listen(port, () =>{
    console.log(`Startd up at port ${port}`);
});