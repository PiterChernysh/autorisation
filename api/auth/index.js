const { Router } = require("express");
const router = Router();
const { validate, authorizeUser } = require("../middlewares");
const { auth } = require("./auth.validation");
const ctrl = require("./auth.controller");
const passport = require("passport");


router.get("/", (req, res) => {
    res.render("auth.nunjucks", {
        user: req.user || {}
    });
});
/**
 * @api {post} /api/auth Авторизация пользователя
 * @apiName authUser
 * @apiGroup Auth
 *
 * @apiParam {String} email Email пользователя
 * @apiParam {String} password Пароль пользователя
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *      "email": "test@test.com",
 *      "password": "123456789"
 *  }
  * @apiError error Логин или пароль неверен
 *
 * @apiSuccessExample {json} Response:
 *  {
 *      "result": {
 *          "_id": "5d15a5ec6d720117c9625abb",
 *          "email": "test@test.com",
 *          "password": "$2b$08$kFZWDqPtcijpOZL75APq1.OlQ4aDpqsFYFo9FCMkMiC/e3VyIIWk6",
 *          "createdAt": "2019-06-28T05:30:20.353Z",
 *          "updatedAt": "2019-06-28T05:30:20.353Z",
 *          "__v": 0
 *      }
 *  }
 */

router.post("/", validate(auth), passport.authenticate("local", {}), ctrl.authUser);

/**
 * @api {get} /api/auth/check Проверка авторизован ли пользователь
 * @apiName checkAuth
 * @apiGroup Auth
 *
 * @apiError error Пользователь не авторизован
 *
 * @apiSuccessExample {json} Response:
 *  {
 *      "result": {
 *          "_id": "5d15a5ec6d720117c9625abb",
 *          "email": "test@test.com",
 *          "password": "$2b$08$kFZWDqPtcijpOZL75APq1.OlQ4aDpqsFYFo9FCMkMiC/e3VyIIWk6",
 *          "createdAt": "2019-06-28T05:30:20.353Z",
 *          "updatedAt": "2019-06-28T05:30:20.353Z",
 *          "__v": 0
 *      }
 *  }
 */

router.get("/check", authorizeUser, ctrl.checkAuth);

/**
 * @api {get} /api/auth/logout Проверка авторизован ли пользователь
 * @apiName logOutUser
 * @apiGroup Auth
 *
 * @apiError error Пользователь не авторизован
 *
 * @apiSuccessExample {json} Response:
 *  {
 *         "message": "logout success"
 *  }
 */

router.get("/logout", authorizeUser, ctrl.logOutUser);

module.exports = router;
