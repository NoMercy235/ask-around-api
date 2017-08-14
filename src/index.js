let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let mongoose = require('mongoose');

let config = require('./config'); // get our config file
let jwtConfig = require('./middleware/jwt'); // used to create, sign, and verify tokens

let port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(jwtConfig);

let routes = require('./api');
for (let key in routes) {
    if (routes.hasOwnProperty(key)) {
        app.use('/api', routes[key])
    }
}

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
