"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addResult = addResult;
exports.getAllResults = getAllResults;
exports.getUserResults = getUserResults;
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
var Results = _index2["default"].results;
var Questions = _index2["default"].questions;
var User = _index2["default"].user;
var lookUpQuestion = function lookUpQuestion(arr, question_unique_id) {
  var question;
  for (var i = 0; i < arr.length; i++) {
    var _question_unique_id = arr[i]['question_unique_id'];
    if (_question_unique_id === question_unique_id) {
      question = true;
      break;
    }
  }
  return question;
};
var lookUpAnswer = function lookUpAnswer(arr, question_unique_id) {
  var answer;
  for (var i = 0; i < arr.length; i++) {
    var _question_unique_id = arr[i]['question_unique_id'];
    var _answer = arr[i]['answer'];
    if (_question_unique_id === question_unique_id) {
      answer = _answer;
      break;
    }
  }
  return answer;
};
function addResult(req, res) {
  var user_unique_id = req.UNIQUE_ID;
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _index.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Questions.findAndCountAll({
      attributes: ['unique_id', 'answer']
    }).then(function (data) {
      var total_questions_count = data.count;
      var total_questions = data.rows;
      if (payload.datasets.length !== total_questions_count) {
        (0, _index.ConflictError)(res, "Invalid number of datasets, must match number of questions");
      } else {
        var correct_answers = 0;
        var incorrect_answers = 0;
        var check_all_questions = [];
        total_questions.map(function (obj, key) {
          var _unique_id = obj.unique_id;
          var _answer = obj.answer;
          if (lookUpQuestion(payload.datasets, _unique_id)) {
            check_all_questions.push(true);
            if (lookUpAnswer(payload.datasets, _unique_id) && lookUpAnswer(payload.datasets, _unique_id) === _answer) {
              correct_answers += 1;
            } else {
              incorrect_answers += 1;
            }
          } else {
            check_all_questions.push(false);
          }
        });
        if (check_all_questions.includes(false)) {
          (0, _index.ConflictError)(res, "Not all questions provided are valid");
        } else {
          var total = correct_answers + incorrect_answers;
          var average = 100 / total;
          var percentage = correct_answers * average;
          Results.create({
            unique_id: (0, _uuid.v4)(),
            user_unique_id: user_unique_id,
            percentage: percentage
          }).then(function (result) {
            (0, _index.CreationSuccessResponse)(res, "Result was added successfully!", {
              percentage: percentage
            });
          })["catch"](function (err) {
            (0, _index.ServerError)(res, err.message, null);
          });
        }
      }
    });
  }
}
;
function getAllResults(req, res) {
  Results.findAndCountAll({
    attributes: {
      exclude: ['id']
    },
    order: [['createdAt', 'DESC']],
    include: [{
      model: User,
      attributes: ['firstname', 'lastname', 'email']
    }]
  }).then(function (results) {
    if (!results || results.length == 0) {
      (0, _index.SuccessResponse)(res, "Results Not found", []);
    } else {
      (0, _index.SuccessResponse)(res, "Results loaded", results);
    }
  })["catch"](function (err) {
    (0, _index.ServerError)(res, err.message, null);
  });
}
;
function getUserResults(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _index.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Results.findAndCountAll({
      attributes: {
        exclude: ['id', 'updatedAt', 'user_unique_id']
      },
      where: _objectSpread({}, payload),
      order: [['createdAt', 'DESC']]
    }).then(function (results) {
      if (!results || results.length == 0) {
        (0, _index.SuccessResponse)(res, "User results Not found", []);
      } else {
        (0, _index.SuccessResponse)(res, "User results loaded", results);
      }
    })["catch"](function (err) {
      (0, _index.ServerError)(res, err.message, null);
    });
  }
}
;