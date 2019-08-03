const Joi = require("joi");

exports.register = {
  body: {
    email: Joi.string()
      .trim()
      .email()
      .max(512)
      .required(),
    password: Joi.string()
      .trim()
      // .regex()
      .min(6)
      .max(512)
      .required()
  }
};


exports.profile = {
  body: {
      name: Joi.string()
          .trim(),
      surname: Joi.string()
          .trim(),
      email: Joi.string()
          .trim()
          .email()
          .max(512)
          .required(),
      password: Joi.string()
          .trim()
          .min(6)
          .max(512)
          .required(),
      birthday: Joi.date(),
          //.timestamp(),
      avatar: Joi.string()
          .trim()
          .regex(/[0-9a-f]{24}/i),
      role: Joi.string() // admin/moderator/user
  }
};
