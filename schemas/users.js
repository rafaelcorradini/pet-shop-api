import Joi from 'joi';

module.exports = {
    body: {
        id: Joi.string(),
        _id: Joi.string(),
        _rev: Joi.string(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        username: Joi.string().required(),
        cpf: Joi.string(),
        role: Joi.string().required()
    }
}