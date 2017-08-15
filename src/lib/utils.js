
let sendErrorResponse = (res, errors, message = 'Bad request') => {
    res.status(401).send({ message: message, errors: errors });
};

module.exports = {
    sendErrorResponse: sendErrorResponse
};