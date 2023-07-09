"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.questionsRules = void 0;
var _expressValidator = require("express-validator");
var _authConfig = require("../config/auth.config.js");
var questionsRules = {
  forFindingQuestion: [(0, _expressValidator.check)('unique_id').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Unique Id is required")],
  forAdding: [(0, _expressValidator.check)('question').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Question is required"), (0, _expressValidator.check)('question').isLength({
    min: 10,
    max: _authConfig.check_length_TEXT
  }).withMessage("Invalid length (10 - ".concat(_authConfig.check_length_TEXT, ") characters")), (0, _expressValidator.check)('option1').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Option 1 is required"), (0, _expressValidator.check)('option1').isLength({
    min: 3,
    max: _authConfig.check_length_TEXT
  }).withMessage("Invalid length (3 - ".concat(_authConfig.check_length_TEXT, ") characters")), (0, _expressValidator.check)('option2').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Option 2 is required"), (0, _expressValidator.check)('option2').isLength({
    min: 3,
    max: _authConfig.check_length_TEXT
  }).withMessage("Invalid length (3 - ".concat(_authConfig.check_length_TEXT, ") characters")), (0, _expressValidator.check)('option3').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Option 3 is required"), (0, _expressValidator.check)('option3').isLength({
    min: 3,
    max: _authConfig.check_length_TEXT
  }).withMessage("Invalid length (3 - ".concat(_authConfig.check_length_TEXT, ") characters")), (0, _expressValidator.check)('option4').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Option 4 is required"), (0, _expressValidator.check)('option4').isLength({
    min: 3,
    max: _authConfig.check_length_TEXT
  }).withMessage("Invalid length (3 - ".concat(_authConfig.check_length_TEXT, ") characters")), (0, _expressValidator.check)('answer').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Answer is required"), (0, _expressValidator.check)('answer').isLength({
    min: 5,
    max: 10
  }).withMessage("Invalid length (5 - 10) characters"), (0, _expressValidator.check)('answer').custom(function (answer) {
    return !!_authConfig.answers_option.includes(answer);
  }).withMessage('Answer has to be - Option 1, Option 2, Option 3 or Option 4')],
  forUpdating: [(0, _expressValidator.check)('unique_id').exists().withMessage("Unique Id is required"), (0, _expressValidator.check)('question').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Question is required"), (0, _expressValidator.check)('question').isLength({
    min: 10,
    max: _authConfig.check_length_TEXT
  }).withMessage("Invalid length (10 - ".concat(_authConfig.check_length_TEXT, ") characters")), (0, _expressValidator.check)('option1').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Option 1 is required"), (0, _expressValidator.check)('option1').isLength({
    min: 3,
    max: _authConfig.check_length_TEXT
  }).withMessage("Invalid length (3 - ".concat(_authConfig.check_length_TEXT, ") characters")), (0, _expressValidator.check)('option2').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Option 2 is required"), (0, _expressValidator.check)('option2').isLength({
    min: 3,
    max: _authConfig.check_length_TEXT
  }).withMessage("Invalid length (3 - ".concat(_authConfig.check_length_TEXT, ") characters")), (0, _expressValidator.check)('option3').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Option 3 is required"), (0, _expressValidator.check)('option3').isLength({
    min: 3,
    max: _authConfig.check_length_TEXT
  }).withMessage("Invalid length (3 - ".concat(_authConfig.check_length_TEXT, ") characters")), (0, _expressValidator.check)('option4').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Option 4 is required"), (0, _expressValidator.check)('option4').isLength({
    min: 3,
    max: _authConfig.check_length_TEXT
  }).withMessage("Invalid length (3 - ".concat(_authConfig.check_length_TEXT, ") characters")), (0, _expressValidator.check)('answer').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Answer is required"), (0, _expressValidator.check)('answer').isLength({
    min: 5,
    max: 10
  }).withMessage("Invalid length (5 - 10) characters"), (0, _expressValidator.check)('answer').custom(function (answer) {
    return !!_authConfig.answers_option.includes(answer);
  }).withMessage('Answer has to be - Option 1, Option 2, Option 3 or Option 4')]
};
exports.questionsRules = questionsRules;