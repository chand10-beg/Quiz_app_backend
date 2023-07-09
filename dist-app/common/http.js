"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationError = exports.UnauthorizedError = exports.TooManyRequestError = exports.SuccessResponse = exports.ServerError = exports.OtherSuccessResponse = exports.NotFoundError = exports.ForbiddenError = exports.CreationSuccessResponse = exports.ConflictError = exports.BadRequestError = void 0;
var _httpConfig = require("../config/http.config.js");
var _logger = _interopRequireDefault(require("./logger.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SuccessResponse = function SuccessResponse(res, message, data) {
  _logger["default"].info(message);
  return res.status(_httpConfig.SuccessResCode).send({
    success: true,
    message: message,
    data: !data ? null : data
  });
};
exports.SuccessResponse = SuccessResponse;
var CreationSuccessResponse = function CreationSuccessResponse(res, message, data) {
  _logger["default"].info(message);
  return res.status(_httpConfig.CreateSuccessResCode).send({
    success: true,
    message: message,
    data: !data ? null : data
  });
};
exports.CreationSuccessResponse = CreationSuccessResponse;
var OtherSuccessResponse = function OtherSuccessResponse(res, message, data) {
  _logger["default"].info(message);
  return res.status(_httpConfig.NoContentSuccessResCode).send({
    success: true,
    message: message,
    data: !data ? null : data
  });
};
exports.OtherSuccessResponse = OtherSuccessResponse;
var NotFoundError = function NotFoundError(res, message, data) {
  _logger["default"].error(message);
  return res.status(_httpConfig.NotFoundResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};
exports.NotFoundError = NotFoundError;
var BadRequestError = function BadRequestError(res, message, data) {
  _logger["default"].warn(message);
  return res.status(_httpConfig.UserErrorResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};
exports.BadRequestError = BadRequestError;
var ValidationError = function ValidationError(res, message, data) {
  _logger["default"].warn(message);
  return res.status(_httpConfig.UserValidationErrorResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};
exports.ValidationError = ValidationError;
var UnauthorizedError = function UnauthorizedError(res, message, data) {
  _logger["default"].warn(message);
  return res.status(_httpConfig.InvalidAuthenticationErrorResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};
exports.UnauthorizedError = UnauthorizedError;
var ForbiddenError = function ForbiddenError(res, message, data) {
  _logger["default"].error(message);
  return res.status(_httpConfig.AuthenticationErrorResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};
exports.ForbiddenError = ForbiddenError;
var ConflictError = function ConflictError(res, message, data) {
  _logger["default"].warn(message);
  return res.status(_httpConfig.ConflictResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};
exports.ConflictError = ConflictError;
var TooManyRequestError = function TooManyRequestError(res, message, data) {
  _logger["default"].warn(message);
  return res.status(_httpConfig.TooManyRequestsResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};
exports.TooManyRequestError = TooManyRequestError;
var ServerError = function ServerError(res, message, data) {
  _logger["default"].error(message);
  return res.status(_httpConfig.ServerErrorResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};
exports.ServerError = ServerError;