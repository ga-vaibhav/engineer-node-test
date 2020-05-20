const apiHelper = require('../helpers/api.helper');
const GLOBAL = require('../constants/global.constant');

const joiMiddleware = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            const { details } = result.error;
            const message = details.map(val => val.message).join(',');
            return apiHelper.failure(res, [], message, GLOBAL.STATUS_CODE.BAD_REQUEST);
        }
        next();
    }
}

module.exports = joiMiddleware;