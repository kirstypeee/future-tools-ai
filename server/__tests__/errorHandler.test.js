const errorHandler = require('../errorHandler');
const { mockRequestResponse } = require('./utils');

test('error handler passes through response status', () => {
    const { req, res, next } = mockRequestResponse();
    const error = {
        status: 502
    };
    errorHandler(error, req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(502);
});

test('error handler defaults response status', () => {
    const { req, res, next } = mockRequestResponse();
    const error = {};
    errorHandler(error, req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(500);
});

test('error handler sends error body', () => {
    const { req, res, next } = mockRequestResponse();
    const error = {
        status: 502,
        message: 'Proxy error'
    };
    errorHandler(error, req, res, next);
    expect(res.json.mock.calls[0][0]).toEqual({
        message: 'Proxy error',
        status: 502
    });
});
