let jwt = require('jsonwebtoken');
let User = require('../../models/user');
let config = require('../../config');
let Utils = require('../../lib/utils');

let controller = {};

controller.authenticate = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
            res.status(401).send({ message: 'Authentication failed' });
        } else if (user) {
            let token = jwt.sign({ email: user.email }, config.secret, {
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

controller.register = (req, res) => {
    let user = User(req.body);
    user.save((err) => {
        if (err) {
            Utils.sendErrorResponse(res, err.errors, 'Bad parameters');
        } else {
            res.json(user);
        }
    });
};

module.exports = controller;
