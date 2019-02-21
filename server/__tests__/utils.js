function mockRequestResponse() {
    const req = { pipe: jest.fn() };
    const res = {
        json: jest.fn(),
        status: jest.fn()
    };

    res.json.mockImplementation(() => res);
    res.status.mockImplementation(() => res);

    return { req, res };
}

module.exports = { mockRequestResponse };
