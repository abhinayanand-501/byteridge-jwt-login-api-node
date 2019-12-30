const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb+srv://interview:welcome2byteridge@byteridge-hdrl6.mongodb.net/interview',{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect("mongodb://127.0.0.1/test",{useNewUrlParser: true, useUnifiedTopology: true});

const connection =  mongoose.connection;
connection.on('connected', function(){
    console.log('Connected to database');
});

connection.on('error', function(err){
	console.log('Error while connecting to database'+ err);
});

module.exports = connection;