let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let mongoose = require('mongoose');

let config = require('./config');
let jwtConfig = require('./middleware/jwt');

let port = process.env.PORT || 8080;

// Overriding the deprecated "Promise" module of mongoose.
// For more information see: https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(jwtConfig);

let apiRoutes = require('./api').routes;
for (let key in apiRoutes) {
    if (apiRoutes.hasOwnProperty(key)) {
        app.use('/api' + apiRoutes[key].prefix, apiRoutes[key].routes)
    }
}

app.listen(port);
