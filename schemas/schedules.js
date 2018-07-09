import Joi from 'joi';

module.exports = {
    body: {
        id: Joi.string(),
        _id: Joi.string(),
        _rev: Joi.string(),
        serviceId: Joi.string().required(),
        date: Joi.string().required(),
        time: Joi.string().required(),
        animalId: Joi.string().required(),
        clientId: Joi.string()
    }
}