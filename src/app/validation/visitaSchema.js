const Joi = require("joi");

const visitaSchema = Joi.object({
  visitDate: Joi.date().iso().required(),
  visitanteId: Joi.string().hex().required(),
});

module.exports = { visitaSchema };
