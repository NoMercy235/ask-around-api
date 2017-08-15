module.exports = {
    routes: {
        user: { prefix: '/user', routes: require('./user/user.routes') },
        auth: { prefix: '/auth', routes: require('./auth/auth.routes') },
    }
};
