const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = require('../_configuration/db');

const authLoggerSchema = new Schema({
    user_id: {type:Schema.ObjectId, ref:'users'},
    type: String,
    clientIp: String
},
{
    timestamps: true
});

const AuthLogger = connection.model('authenticationLoggers', authLoggerSchema);

module.exports = AuthLogger;