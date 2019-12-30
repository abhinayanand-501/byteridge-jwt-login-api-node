const config = require('config.json');
const jwt = require('jsonwebtoken');
const usersdb = require('../_models/user');
const authlogdb = require('../_models/authenticationLogger');

module.exports = {
    authenticate,
    getAll,
    authenticationLogger,
    getAuditdata
};

insertData();

async function authenticate({ username, password, role }) {

    const user = await usersdb.findOne({username: username, password: password, role: role},{password:0});
    if (user) {
        const token = jwt.sign({ sub: user._id }, config.secret);
        const userWithoutPassword = user.toJSON();
        return {
            ...userWithoutPassword,
            token
        }
    };
}

async function getAll() {

    const users = await usersdb.find();
    return users.map(data => {
        let userdata = data.toJSON();
        const { password, ...userWithoutPassword } = userdata;
        return userWithoutPassword;
    });
}

async function authenticationLogger({user_id, type, clientIp}) {

    let authlogdata = new authlogdb({user_id, type, clientIp});
    const savedData = await authlogdata.save();
    return savedData.toJSON();
}

async function getAuditdata() {

// Using aggreagate

const users = await usersdb.aggregate([{
    $lookup: {
        from:"authenticationloggers",
        localField:"_id",
        foreignField:"user_id",
        as:"authenticationlogs"
    }
    }]).exec();
    return users.map(data => {
        let userdata = data;
        const { password, ...userWithoutPassword } = userdata;
        return userWithoutPassword;
    });
// console.log(users[0]);
// return users[0];

// Using populate

// const users = await usersdb.find()
//     .populate('authenticationloggers')
//     .exec();
    // console.log(users);
    // return users.map(data => {
    //     let userdata = data.toJSON();
    //     const { password, ...userWithoutPassword } = userdata;
    //     console.log(userWithoutPassword);
    //     return userWithoutPassword;
    // })
    // let userdata = users;
    // const {password, ...userWithoutPassword} = userdata;
    // console.log(users);
    // return users;

}

async function insertData() {
    const users = await usersdb.find();
    if(users.length === 0) {
        const data = [
            {
                "username" : "user1",
                "password" : "user1",
                "firstName" : "User1",
                "lastName" : "Test1",
                "role" : "Normal"
            },
            {
                "username" : "user2",
                "password" : "user2",
                "firstName" : "User2",
                "lastName" : "Test2",
                "role" : "Normal"
            },
            {
                "username" : "user3",
                "password" : "user3",
                "firstName" : "User3",
                "lastName" : "Test3",
                "role" : "Normal"
            },
            {
                "username" : "audit",
                "password" : "audit",
                "firstName" : "Audit",
                "lastName" : "User",
                "role" : "Auditor"
            }
        ];
        const usersdata = await usersdb.insertMany(data);
    }
}
