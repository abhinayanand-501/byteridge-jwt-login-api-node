const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);
router.post('/authentication-logger', authenticationLogger);
router.get('/audit', getAuditdata);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username/password/role is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function authenticationLogger(req, res, next) {
    req.body.clientIp = req.clientIp;
    userService.authenticationLogger(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({message: 'Error while recording the login/logout time'}))
    .catch(err => next(err));
}

function getAuditdata(req, res, next) {
    userService.getAuditdata()
    .then(users => res.json(users))
    .catch(err => next(err))
}
