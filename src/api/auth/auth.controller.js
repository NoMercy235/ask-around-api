let jwt = require('jsonwebtoken');
let User = require('../../models/user');
let config = require('../../config');
let constants = require('../common/constants');

let controller = {};

controller.authenticate = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
            res.status(constants.HTTP_CODES.UNAUTHORIZED).json({ message: 'Authentication failed' });
        } else if (user) {
            let token = jwt.sign({ email: user.email }, config.secret, {
                expiresIn: constants.TOKEN_EXPIRE_TIME,
            });

            res.status(constants.HTTP_CODES.OK).json({
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
            res.status(constants.HTTP_CODES.BAD_REQUEST).json(err);
        } else {
            res.json(user);
        }
    });
};

module.exports = controller;
