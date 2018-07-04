import Joi from 'joi';

module.exports = {
  body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      username: Joi.string().required()
  }
}