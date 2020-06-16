const Joi = require('joi');

module.exports.validate = (data) => {
    const userSchema = Joi.object().keys({
        login: Joi.string().regex(/^[a-z][a-z0-9]*?(_[a-z0-9]+){0,2}$/i).required(),
        password: Joi.string().regex(/^[a-z][a-z0-9]*?(_[a-z0-9]+){0,2}$/i).required()
    })
    const result = Joi.validate(data, userSchema);
    if (result.error) {
        throw result.error;
    }
    return result.value;
}