import Joi from 'joi';

module.exports = {
  body: {
      name: Joi.string().required(),
      type: Joi.string().required()
  }
}