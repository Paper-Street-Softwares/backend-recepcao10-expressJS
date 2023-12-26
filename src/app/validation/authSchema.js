const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(4),
});

module.exports = { authSchema };
