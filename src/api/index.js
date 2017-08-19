module.exports = {
    routes: {
        auth: { prefix: '/auth', routes: require('./auth/auth.routes') },
        user: { prefix: '/api/user', routes: require('./user/user.routes') },
        question: { prefix: '/api/question', routes: require('./question/question.routes') },
    }
};
