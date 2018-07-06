import Joi from 'joi';

module.exports = {
  body: {
      service: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.string().required(),
      time: Joi.string().required(),
  }
}