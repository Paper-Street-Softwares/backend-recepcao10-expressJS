const Joi = require("joi");

const visitanteSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  cityAndState: Joi.string().required(),
  age: Joi.number().required(),
  gender: Joi.string().required(),
  religion: Joi.string().required(),
  smallGroup: Joi.string().required(),
  bibleStudy: Joi.string().required(),
});

module.exports = { visitanteSchema };
