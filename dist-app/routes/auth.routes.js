"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _index = require("../middleware/index.js");
var _authController = require("../controllers/auth.controller.js");
var _adminRules = require("../rules/admin.rules.js");
var _userRules = require("../rules/user.rules.js");
function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });
  app.post("/api/auth/backoffice/signup", [_adminRules.adminRules.forAdding, _index.verifyAdminSignUp.checkDuplicateEmail], _authController.adminSignup);
  app.post("/api/auth/backoffice/signin", [_adminRules.adminRules.forLogin], _authController.adminSignin);
  app.post("/api/auth/signup", [_userRules.userRules.forAdding, _index.verifyUserSignUp.checkDuplicateEmail], _authController.userSignup);
  app.post("/api/auth/signin", [_userRules.userRules.forLogin], _authController.userSignin);
}
;