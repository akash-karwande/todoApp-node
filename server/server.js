const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const { authenticate} = require('./middleware/authenticate');



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

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['name', 'completed']);

    if(!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body},{new: true}).then((todo) => {
        if(!todo) {
           return res.status(404).send();
        }

        res.send({todo});

    }).catch((err) => {
        res.status(400).send();
    });
});


// POST user

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        
     return user.generateAuthToken();

    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});



app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


app.listen(port, () =>{
    console.log(`Startd up at port ${port}`);
});