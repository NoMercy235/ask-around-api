let User = require('../../models/user');
let controller = {};

controller.getBase = (req, res) => {
    res.json({ message: 'Welcome to the coolest API on earth!' });
};

controller.getUsers = (req, res) => {
    User.find({}, function(err, users) {
        res.json(users);
    });
};

controller.saveUser = (req, res) => {
    let nick = new User({
        firstName: 'Nick',
        lastName: 'Mihale',
        email: 'nick@seinternal.com',
        password: 'mypass',
        isAdmin: true
    });

    nick.save((err) => {
        if (err) throw err;
        console.log('User saved successfully');
        res.json(nick);
    });
};

module.exports = controller;