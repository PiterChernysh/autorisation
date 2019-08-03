const UserModel = require("./user.model");

exports.createUser = userData => {
    return UserModel.saveUser(userData);
};

exports.getProfile = (id) => {
    return UserModel.getProfile(id);
};

exports.updateProfile = (id, data) => {
    return UserModel.updateProfile(id, data);
};
