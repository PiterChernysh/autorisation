const userServices = require("./user.service");
const UserModel = require("./user.model");


exports.registerNewUser = async (req, res, next) => {
    let b = req.body;
    try {
        const result = await userServices.createUser(req.body);
        res.json({
            result
        });
    } catch (e) {
        next(e);
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const data = await userServices.getProfile(req.user._id);
        res.json(data);
    } catch (e) {
        next(e);
    }
};

const getProfileAndUserSchema = async (id) => {
    const data = await userServices.getProfile(id);
    delete data[0].updatedAt;
    delete data[0].createdAt;
    delete data[0]._id;
    const arrSchema = Object.keys(UserModel.schema.paths);
    arrSchema.remove('_id');
    arrSchema.remove('__v');
    arrSchema.remove('createdAt');
    arrSchema.remove('updatedAt');
    data.push(arrSchema);
    return data;
};
exports.GETupdateProfileById = async (req, res, next) => {
    try {
        res.render("update_profile.nunjucks", {});
    } catch (e) {
        next(e);
    }
};
exports.POSTupdateProfileById= async (req, res, next) => {
    try {
        res.json(await getProfileAndUserSchema(req.user._id));
    } catch (e) {
        next(e);
    }
};
exports.updateProfileById = async (req, res, next) => {
    try {
        const b = req.body;
        res.json({
            myData: await userServices.updateProfile(req.user._id, req.body)
        });
    } catch (e) {
        next(e);
    }
};




