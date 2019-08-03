const express = require("express");
const session = require("express-session");
const debug = require("debug")("auth:server");
const path = require("path");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportLocal = require("passport-local");
const UserModel = require("./api/user/user.model");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    cookie: {
      httpOnly: true
    },
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      stringify: false
    })
  })
);

passport.use(
  new passportLocal.Strategy(UserModel.loginUser.bind(UserModel), {
    usernameField: "email",
    passwordField: "password"
  })
);
passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});
passport.deserializeUser(UserModel.deserializeUser.bind(UserModel));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://Localhost:27017/hillei", {
    useNewUrlParser: true
  });
mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);

mongoose.connection.on("open", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("error", err => {
  console.error("Some DB error", err);
  process.exit(0);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

nunjucks.configure(path.join(__dirname, "templates"), {
  express: app,
  watch: true
});
app.use("/api", require("./api"));
app.listen(3000, () => {
  console.log(`server is listening on ${PORT}`);
  debug(`Listening on ${PORT}`);
});
