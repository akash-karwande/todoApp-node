//const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

// var message = "hey its me akash";

// var hash = SHA256(message).toString();

// console.log(message , hash)

var data = {
    id: 10
};

var token = jwt.sign(data, '123');
var decode = jwt.verify(token, '123');

console.log(decode);