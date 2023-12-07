const yup = require("yup");

const nameValidation = yup.object({
  name: yup.string().required(),
});

module.exports = nameValidation;
