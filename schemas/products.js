import Joi from 'joi';

module.exports = {
  body: {
      name: Joi.string().required(),
      description: Joi.string().required()
  }
}