"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminSignin = adminSignin;
exports.adminSignup = adminSignup;
exports.userSignin = userSignin;
exports.userSignup = userSignup;
var _expressValidator = require("express-validator");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _uuid = require("uuid");
var _index = require("../common/index.js");
var _index2 = _interopRequireDefault(require("../models/index.js"));
var _authConfig = require("../config/auth.config.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var User = _index2["default"].user;
var Admin = _index2["default"].admin;
// const Op = db.Sequelize.Op;
var sign = _jsonwebtoken["default"].sign;
var hashSync = _bcryptjs["default"].hashSync;
var compareSync = _bcryptjs["default"].compareSync;
function userSignup(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _index.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    User.create(_objectSpread(_objectSpread({}, payload), {}, {
      unique_id: (0, _uuid.v4)(),
      password: hashSync(payload.password, 8)
    })).then(function (user) {
      (0, _index.CreationSuccessResponse)(res, "User was registered successfully!", {
        unique_id: user.unique_id
      });
    })["catch"](function (err) {
      if (err.original.code === 'ER_DUP_ENTRY') {
        (0, _index.ConflictError)(res, "Email already exists", null);
      } else {
        (0, _index.ServerError)(res, err.original.sqlMessage, null);
      }
    });
  }
}
;
function adminSignup(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _index.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Admin.create(_objectSpread(_objectSpread({}, payload), {}, {
      unique_id: (0, _uuid.v4)(),
      password: hashSync(payload.password, 8)
    })).then(function (admin) {
      (0, _index.CreationSuccessResponse)(res, "Admin was registered successfully!", {
        unique_id: admin.unique_id
      });
    })["catch"](function (err) {
      if (err.original.code === 'ER_DUP_ENTRY') {
        (0, _index.ConflictError)(res, "Email already exists", null);
      } else {
        (0, _index.ServerError)(res, err.original.sqlMessage, null);
      }
    });
  }
}
;
function userSignin(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _index.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    User.findOne({
      where: {
        email: payload.email
      }
    }).then(function (user) {
      if (!user) {
        (0, _index.NotFoundError)(res, "User not found", null);
      } else {
        var passwordIsValid = compareSync(payload.password, user.password);
        if (!passwordIsValid) {
          (0, _index.UnauthorizedError)(res, "Invalid Password!", null);
        } else {
          var token = sign({
            unique_id: user.unique_id
          }, _authConfig.secret, {
            expiresIn: 86400 // 24 hours
          });

          (0, _index.SuccessResponse)(res, "Logged in successfully!", {
            token: token,
            fullname: user.firstname + " " + user.lastname,
            email: user.email
          });
        }
      }
    })["catch"](function (err) {
      (0, _index.ServerError)(res, err.message, null);
    });
  }
}
;
function adminSignin(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _index.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Admin.findOne({
      where: {
        email: payload.email
      }
    }).then(function (admin) {
      if (!admin) {
        (0, _index.NotFoundError)(res, "Admin not found", null);
      } else {
        var passwordIsValid = compareSync(payload.password, admin.password);
        if (!passwordIsValid) {
          (0, _index.UnauthorizedError)(res, "Invalid Password!", null);
        } else {
          var token = sign({
            unique_id: admin.unique_id
          }, _authConfig.secret, {
            expiresIn: 86400 // 24 hours
          });

          (0, _index.SuccessResponse)(res, "Logged in successfully!", {
            token: token,
            fullname: admin.firstname + " " + admin.lastname,
            email: admin.email
          });
        }
      }
    })["catch"](function (err) {
      (0, _index.ServerError)(res, err.message, null);
    });
  }
}
;