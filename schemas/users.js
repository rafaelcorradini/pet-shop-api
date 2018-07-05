import Joi from 'joi';

module.exports = {
  body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      username: Joi.string().required(),
      cpf: Joi.string(),
      role: Joi.string().required()
  }
}