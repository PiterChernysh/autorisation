const UserModel = require("../user/user.model");

exports.loginUser = userData => {
  return UserModel.loginUser(userData);
};

exports.getUserData = id => {
  return UserModel.getUserById(id);
};
