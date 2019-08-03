const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
    {
        name: { type: String, trim: true },
        surname: { type: String, trim: true },
        email: { type: String, trim: true, unique: true, lowercase: true },
        password: { type: String },
        birthday: { type: Date },
        //avatar: { type: Schema.Types.ObjectId, ref: "FilesModel" },
        role: { type: String } // admin/moderator/user
    },
    {
        collection: "UserCollection",
        timestamps: true
    }
);

UserSchema.statics = {
    saveUser: function (obj) {
        return this.create(obj);
    },
    loginUser: function (email, password, cb) {
        console.log(email.toLowerCase());
        this.findOne({ email: email.toLowerCase() })
            .lean()
            .exec((err, doc) => {
                if (err) return cb(err);
                if (!doc) return cb(new Error("password or email not correct"));
                const same = bcrypt.compareSync(password, doc.password);
                if (same) cb(false, doc);
                else cb(new Error("password or email not correct"));
            });
    },
    deserializeUser: function (id, cb) {
        this.findById(id)
            .lean()
            .exec((err, user) => {
                if (err) {
                    return cb(err);
                }
                cb(null, user);
            });
    },
    getProfile: function (id) {
        return this.find(id)
            .select("name surname nameCategori email password birthday role")
            .lean()
            .exec();
    },
    updateProfile: async function (id, data) {
        //console.log(data);
        const doc = await this.findById(id).exec();
        if (!doc) {
            throw new Error("contact not found");
        }
        Object.assign(doc, data);  //Перезаписываем все
        return doc.save();
    }
    
};

UserSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
});

module.exports = mongoose.model("UserModel", UserSchema);

