'use strict';

const validator = (req, res, next) => {
    if (!req.query.name) {
        throw new Error('Something went wrong.');
    }
    next();
}

module.exports = validator;
