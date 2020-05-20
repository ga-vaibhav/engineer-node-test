const Joi = require('@hapi/joi');
const createUser = Joi.object().keys({
    id: Joi.number().require(),
    firstName: Joi.number().require(),
    lastName: Joi.number().require(),
    email: Joi.number().require()
});

module.exports = {
    createUser
}