const authServices = require("./auth.service");

exports.authUser = async (req, res, next) => {
  try {
    //const user = await authServices.loginUser(req.body);
    //res.cookie("token", req.user._id);
    //req.session.user = req.user._id;
    res.json({ result: req.user });
  } catch (e) {
    next(e);
  }
};

exports.checkAuth = async (req, res, next) => {
  try {
    res.json({ data: req.user, counter: req.session.counter });
  } catch (e) {
    next(e);
  }
};

exports.logOutUser = (req, res) => {
  req.logOut();
  res.clearCookie("connect.sid");
  res.json({ message: "logout success" });
};
