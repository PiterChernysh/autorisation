const { register } = require("../user/user.validation");
const Joi = require("joi");

exports.auth = {
  body: {
    username: Joi.string().trim(),
    //email: Joi.string().trim(),
    password: Joi.string().trim()
  }
};
