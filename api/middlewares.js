const { celebrate } = require("celebrate");
const authServices = require("./auth/auth.service");

exports.validate = schema => {
  return celebrate(schema, { stripUnknown: { objects: true } });
};

exports.authorizeUser = async (req, res, next) => {
  try {
    //console.log(req.session);
    if (!req.isAuthenticated()) {
      next(new Error("not authorized"));
    }
    next();
  } catch (e) {
    next(e);
  }
};
