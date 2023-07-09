"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resultsRules = void 0;
var _expressValidator = require("express-validator");
var checkKey = function checkKey(arr, keyName) {
  var check_all = [];
  arr.map(function (obj, key) {
    var keyExist = Object.keys(obj).some(function (key) {
      return key === keyName;
    });
    check_all.push(keyExist);
  });
  if (check_all.includes(false)) return false;
  return true;
};
var resultsRules = {
  forAdding: [(0, _expressValidator.check)('datasets').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Datasets is required"), (0, _expressValidator.check)('datasets').isArray().withMessage('Datasets is not an array'), (0, _expressValidator.check)('datasets').custom(function (datasets) {
    return checkKey(datasets, 'question_unique_id') && checkKey(datasets, 'answer');
  }).withMessage("Each dataset must have a 'question_unique_id' and 'answer' value")]
};
exports.resultsRules = resultsRules;