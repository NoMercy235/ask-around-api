let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let mongoose = require('mongoose');

let config = require('./config');
let passportConfig = require('./middleware/passport');

let port = process.env.PORT || 8080;

// Overriding the deprecated "Promise" module of mongoose.
// For more information see: https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;
// Providing the 'useMongoClient' property to get rid of the deprecated message.
mongoose.connect(config.database, { useMongoClient: true, keepAlive: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(passportConfig.passport.initialize());
app.use(passportConfig.prefix, passportConfig.passport.authenticate('jwt', { session: false }));

let apiRoutes = require('./api').routes;
Object.keys(apiRoutes).forEach((key) => app.use(apiRoutes[key].prefix, apiRoutes[key].routes));

app.listen(port);
