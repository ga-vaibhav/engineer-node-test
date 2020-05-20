const Joi = require('@hapi/joi');
const createUser = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required()
});

module.exports = {
    createUser
}