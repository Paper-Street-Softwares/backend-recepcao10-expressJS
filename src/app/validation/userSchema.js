const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

module.exports = { userSchema };
