import Joi from 'joi';

module.exports = {
    body: {
        id: Joi.string(),
        _id: Joi.string(),
        _rev: Joi.string(),
        name: Joi.string().required(),
        breed: Joi.string(),
        age: Joi.number(),
        species: Joi.string(),
        clientId: Joi.string()
    }
}