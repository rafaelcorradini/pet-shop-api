import Joi from 'joi';

module.exports = {
    body: {
        id: Joi.string(),
        _id: Joi.string(),
        _rev: Joi.string(),
        clientId: Joi.string(),
        items: Joi.array(),
        finalized: Joi.boolean().required(),
        date: Joi.string()
    }
}