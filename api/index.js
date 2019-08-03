const { Router } = require("express");
const router = Router();
const debug = require("debug")("auth:api");
const { authorizeUser } = require('./middlewares');

router.use("/auth", require("./auth"));

router.use("/user", require("./user"));

router.use((err, req, res, next) => {
  debug(err);
  res.status(500).json({ error: err.message || err });
});

module.exports = router;
