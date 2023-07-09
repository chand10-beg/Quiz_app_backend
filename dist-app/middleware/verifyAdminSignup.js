"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _expressValidator = require("express-validator");
var _http = require("../common/http.js");
var _index = _interopRequireDefault(require("../models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Admin = _index["default"].admin;
var checkDuplicateEmail = function checkDuplicateEmail(req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    (0, _http.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Admin.findOne({
      where: {
        email: payload.email
      }
    }).then(function (admin) {
      if (admin) {
        (0, _http.ConflictError)(res, "Email is already in use!", null);
      } else {
        next();
      }
    });
  }
};
var verifyAdminSignUp = {
  checkDuplicateEmail: checkDuplicateEmail
};
var _default = verifyAdminSignUp;
exports["default"] = _default;