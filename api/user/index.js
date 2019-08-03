const { Router } = require("express");
const router = Router();
const ctrl = require("./user.controller");
const val = require("./user.validation");
const { validate, authorizeUser } = require("../middlewares");

router.get("/", (req, res) => { 
    res.render("register.nunjucks", { 
    user: req.user || {} });
});
router.post("/register", validate(val.register), ctrl.registerNewUser);

router.get("/profile", (req, res) => { 
    res.render("profile.nunjucks", {});
});
router.post("/profile", authorizeUser, ctrl.getProfile);

router.get("/update", authorizeUser, ctrl.GETupdateProfileById);
router.post("/update", authorizeUser, ctrl.POSTupdateProfileById);

module.exports = router;
