const Joi = require('@hapi/joi');
const createUser = Joi.object().keys({
    firstName: Joi.number().required(),
    lastName: Joi.number().required(),
    email: Joi.number().required()
});

module.exports = {
    createUser
}