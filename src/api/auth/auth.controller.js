let jwt = require('jsonwebtoken');
let User = require('../../models/user');
let config = require('../../config');

let controller = {};

controller.authenticate = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        console.log(req.body);
        console.log(user);
        if (!user || (user.password !== req.body.password)) {
            res.status(401).send({ message: 'Authentication failed' });
        } else if (user) {
            let token = jwt.sign(user, config.secret, {
                expiresIn: 1440 * 60 // expires in 24 hours
            });

            res.status(200).send({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        }
    });
};

module.exports = controller;