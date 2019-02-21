const request = require('request');
const urljoin = require('url-join');

module.exports = (req, res, next) => {
    const headers = {};
    for (let key in process.env) {
        if (key.startsWith('API_HEADER_')) {
            const headerName = key.replace('API_HEADER_', '').replace(/_/g, '-');
            headers[headerName] = process.env[key];
        }
    }

    const target = process.env.API_ENDPOINT;
    const url = urljoin(target, req.url);
    let requestOptions = { url, headers };

    req.pipe(
        request(requestOptions)
            .on('response', function(response) {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    res.writeHeader(response.statusCode, response.headers);
                    response.pipe(res);
                } else {
                    let error = new Error('Proxy Error');
                    error.status = 502;
                    next(error);
                }
            })
            .on('error', function(err) {
                next(err);
            })
    );
};
