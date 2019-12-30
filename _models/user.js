const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = require('../_configuration/db');

const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    role: String
});

const User = connection.model('users', userSchema);

module.exports = User;