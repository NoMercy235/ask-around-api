module.exports = {
    routes: {
        auth: { prefix: '/auth', routes: require('./auth/auth.routes') },
        user: { prefix: '/api/user', routes: require('./user/user.routes') },
        question: { prefix: '/api/question', routes: require('./question/question.routes') },
        category: { prefix: '/api/category', routes: require('./category/category.routes') },
        score: { prefix: '/api/score', routes: require('./question/question-scores.routes') },
        userPreference: { prefix: '/api/preference', routes: require('./user/user-preference.routes') },
        reply: { prefix: '/api/replies', routes: require('./question/reply.routes') },
    }
};
