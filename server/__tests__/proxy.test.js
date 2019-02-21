const request = require('request');
const { mockRequestResponse } = require('./utils');

function setupTest(url, headers = {}) {
    for (let key in process.env) {
        if (key.startsWith('API_HEADER_')) {
            delete process.env[key];
        }
    }
    process.env.API_ENDPOINT = url;
    for (let key in headers) {
        process.env[key] = headers[key];
    }
    /* eslint-disable global-require */
    return require('../proxy');
}

jest.mock('request', () =>
    jest.fn(() => {
        /* eslint-disable global-require */
        const { EventEmitter } = require('events');
        return new EventEmitter();
    })
);

afterEach(() => {
    jest.clearAllMocks();
});

test('proxy uses API_ENDPOINT variable as downstream server', () => {
    const proxy = setupTest('http://localhost');
    const { req, res, next } = mockRequestResponse();
    proxy(req, res, next);
    expect(request).toHaveBeenLastCalledWith({ url: 'http://localhost/', headers: {} });
});

test('proxy passes custom API headers to downstream server', () => {
    const proxy = setupTest('http://localhost', { API_HEADER_TOKEN: '12345' });
    const { req, res, next } = mockRequestResponse();
    proxy(req, res, next);
    expect(request).toHaveBeenLastCalledWith({
        url: 'http://localhost/',
        headers: { TOKEN: '12345' }
    });
});

test('proxy converts underscores in custom API headers to dashes', () => {
    const proxy = setupTest('http://localhost', { API_HEADER_X_IBM_CLIENTID: '12345' });
    const { req, res, next } = mockRequestResponse();
    proxy(req, res, next);
    expect(request).toHaveBeenLastCalledWith({
        url: 'http://localhost/',
        headers: { 'X-IBM-CLIENTID': '12345' }
    });
});
