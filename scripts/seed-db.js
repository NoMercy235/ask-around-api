console.warn('Do not use this for production database!');

let mongoose = require('mongoose');

let User = require('../src/models/user').model;
let config = require('../src/config');

// Overriding the deprecated "Promise" module of mongoose.
// For more information see: https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true, keepAlive: false });


User.find({ email: 'admin@askaround.com' }).exec().then((data) => {
    if (!data || !data.length) {
        let admin = new User({
            firstName: 'admin',
            lastName: 'askaround',
            email: 'admin@askaround.com',
            password: '123456',
            isAdmin: true,
            isActive: true,
        });
        admin.save();
    }
    process.exit(0);
});

console.log('===================================');
console.log('            Seed complete          ');
console.log('===================================');