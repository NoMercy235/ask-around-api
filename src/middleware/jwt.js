let jwt = require('express-jwt');
const config = require('../config');

let jwtConfig = jwt({
    secret: config.secret,
    requestProperty: 'authorization',
    getToken: (req) => {
        console.log(req.headers);
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        return null;
    }
}).unless({path: ['/api/', /\/auth.+$/g]});

module.exports = jwtConfig;
