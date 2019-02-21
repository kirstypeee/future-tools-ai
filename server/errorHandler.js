module.exports = (err, req, res, next) => {
    const error = errorBody(err);
    res.status(error.status).json(error);
};

const errorBody = error => {
    const status = error.status || 500;
    const body = { status: status };
    if (error.message) {
        body.message = error.message;
    }
    return body;
};
