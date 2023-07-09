"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _authConfig = require("../config/auth.config.js");
var _index = require("../common/index.js");
var _index2 = _interopRequireDefault(require("../models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var verify = _jsonwebtoken["default"].verify;
var User = _index2["default"].user;
var Admin = _index2["default"].admin;
var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers["x-access-token"] || req.query.token || req.body.token || '';
  if (!token) {
    (0, _index.ForbiddenError)(res, "No token provided!", null);
  } else {
    verify(token, _authConfig.secret, function (err, decoded) {
      if (err) {
        (0, _index.UnauthorizedError)(res, "Unauthorized!", null);
      } else {
        req.UNIQUE_ID = decoded.unique_id;
        next();
      }
    });
  }
};
var isAdmin = function isAdmin(req, res, next) {
  Admin.findOne({
    where: {
      unique_id: req.UNIQUE_ID
    }
  }).then(function (admin) {
    if (!admin) {
      (0, _index.ForbiddenError)(res, "Require Admin!", null);
    } else {
      next();
    }
  });
};
var isUser = function isUser(req, res, next) {
  User.findOne({
    where: {
      unique_id: req.UNIQUE_ID
    }
  }).then(function (admin) {
    if (!admin) {
      (0, _index.ForbiddenError)(res, "Require User!", null);
    } else {
      next();
    }
  });
};
var authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUser: isUser
};
var _default = authJwt;
exports["default"] = _default;