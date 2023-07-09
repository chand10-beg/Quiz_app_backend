"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secret = exports.password_options = exports.check_length_TEXT = exports.answers_option = void 0;
var secret = "quizapp-#03@#8@#-secret-key";
exports.secret = secret;
var password_options = {
  minLength: 8,
  minLowercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  minUppercase: 1
};
exports.password_options = password_options;
var answers_option = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
exports.answers_option = answers_option;
var check_length_TEXT = 65535;
exports.check_length_TEXT = check_length_TEXT;