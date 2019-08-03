const Joi = require("joi");

exports.objectId = Joi.string()
  .trim()
  .regex(/[a-f0-9]{24}/i)
  .required();
