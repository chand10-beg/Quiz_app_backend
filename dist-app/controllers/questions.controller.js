"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addQuestion = addQuestion;
exports.getAdminQuestions = getAdminQuestions;
exports.getQuestion = getQuestion;
exports.getQuestions = getQuestions;
exports.removeQuestion = removeQuestion;
exports.updateQuestion = updateQuestion;
var _expressValidator = require("express-validator");
var _uuid = require("uuid");
var _index = require("../common/index.js");
var _index2 = _interopRequireDefault(require("../models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Questions = _index2["default"].questions;
var Admin = _index2["default"].admin;
function getAdminQuestions(req, res) {
  Questions.findAndCountAll({
    attributes: {
      exclude: ['id']
    },
    order: [['createdAt', 'DESC']],
    include: [{
      model: Admin,
      attributes: ['firstname', 'lastname', 'email']
    }]
  }).then(function (questions) {
    if (!questions || questions.length == 0) {
      (0, _index.SuccessResponse)(res, "Questions Not found", []);
    } else {
      (0, _index.SuccessResponse)(res, "Questions loaded", questions);
    }
  })["catch"](function (err) {
    (0, _index.ServerError)(res, err.message, null);
  });
}
;
function getQuestions(req, res) {
  Questions.findAndCountAll({
    attributes: {
      exclude: ['id', 'createdAt', 'updatedAt', 'admin_unique_id']
    },
    order: [['createdAt', 'DESC']]
  }).then(function (questions) {
    if (!questions || questions.length == 0) {
      (0, _index.SuccessResponse)(res, "Questions Not found", []);
    } else {
      (0, _index.SuccessResponse)(res, "Questions loaded", questions);
    }
  })["catch"](function (err) {
    (0, _index.ServerError)(res, err.message, null);
  });
}
;
function getQuestion(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _index.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Questions.findOne({
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt', 'admin_unique_id']
      },
      where: _objectSpread({}, payload)
    }).then(function (question) {
      if (!question) {
        (0, _index.NotFoundError)(res, "Question not found", null);
      } else {
        (0, _index.SuccessResponse)(res, "Question loaded", question);
      }
    })["catch"](function (err) {
      (0, _index.ServerError)(res, err.message, null);
    });
  }
}
;
function addQuestion(req, res) {
  var admin_unique_id = req.UNIQUE_ID;
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _index.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Questions.create(_objectSpread(_objectSpread({}, payload), {}, {
      unique_id: (0, _uuid.v4)(),
      admin_unique_id: admin_unique_id
    })).then(function (question) {
      (0, _index.CreationSuccessResponse)(res, "Question was added successfully!");
    })["catch"](function (err) {
      (0, _index.ServerError)(res, err.message, null);
    });
  }
}
;
function updateQuestion(req, res) {
  var admin_unique_id = req.UNIQUE_ID;
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _index.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Questions.update(_objectSpread(_objectSpread({}, payload), {}, {
      admin_unique_id: admin_unique_id
    }), {
      where: {
        unique_id: payload.unique_id
      }
    }).then(function (data) {
      if (data == 0) {
        (0, _index.NotFoundError)(res, "Question not found", null);
      } else {
        (0, _index.OtherSuccessResponse)(res, "Question details updated successfully!");
      }
    })["catch"](function (err) {
      (0, _index.ServerError)(res, err.message, null);
    });
  }
}
;
function removeQuestion(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _index.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Questions.destroy({
      where: _objectSpread({}, payload)
    }).then(function (data) {
      if (!data) {
        (0, _index.NotFoundError)(res, "Question not found", null);
      } else {
        (0, _index.OtherSuccessResponse)(res, "Question deleted successfully!");
      }
    })["catch"](function (err) {
      (0, _index.ServerError)(res, err.message, null);
    });
  }
}
;