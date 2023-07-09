"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = getUser;
exports.getUsers = getUsers;
exports.removeUser = removeUser;
exports.updateUser = updateUser;
var _expressValidator = require("express-validator");
var _index = require("../common/index.js");
var _index2 = _interopRequireDefault(require("../models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var User = _index2["default"].user;
function getUsers(req, res) {
  User.findAndCountAll({
    attributes: {
      exclude: ['password', 'id']
    },
    order: [['createdAt', 'DESC']]
  }).then(function (users) {
    if (!users || users.length == 0) {
      (0, _index.SuccessResponse)(res, "Users Not found", []);
    } else {
      (0, _index.SuccessResponse)(res, "Users loaded", users);
    }
  })["catch"](function (err) {
    (0, _index.ServerError)(res, err.message, null);
  });
}
;
function getUser(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _index.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    User.findOne({
      attributes: {
        exclude: ['password', 'id', 'unique_id']
      },
      where: _objectSpread({}, payload)
    }).then(function (admin) {
      if (!admin) {
        (0, _index.NotFoundError)(res, "User not found", null);
      } else {
        (0, _index.SuccessResponse)(res, "User loaded", admin);
      }
    })["catch"](function (err) {
      (0, _index.ServerError)(res, err.message, null);
    });
  }
}
;
function updateUser(req, res) {
  var user_unique_id = req.UNIQUE_ID;
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _index.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    User.update(_objectSpread({}, payload), {
      where: {
        unique_id: user_unique_id
      }
    }).then(function (data) {
      if (data == 0) {
        (0, _index.NotFoundError)(res, "User not found", null);
      } else {
        (0, _index.OtherSuccessResponse)(res, "User details updated successfully!");
      }
    })["catch"](function (err) {
      (0, _index.ServerError)(res, err.message, null);
    });
  }
}
;
function removeUser(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _index.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    User.destroy({
      where: _objectSpread({}, payload)
    }).then(function (data) {
      if (!data) {
        (0, _index.NotFoundError)(res, "User not found", null);
      } else {
        (0, _index.OtherSuccessResponse)(res, "User details deleted successfully!");
      }
    })["catch"](function (err) {
      (0, _index.ServerError)(res, err.message, null);
    });
  }
}
;