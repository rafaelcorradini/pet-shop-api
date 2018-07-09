import Joi from 'joi';

module.exports = {
    body: {
        id: Joi.string(),
        _id: Joi.string(),
        _rev: Joi.string(),
        name: Joi.string().required(),
        description: Joi.string().required()
    }
}