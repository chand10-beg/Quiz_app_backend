"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _morgan = _interopRequireDefault(require("morgan"));
var _index = require("../common/index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var morganMiddleware = (0, _morgan["default"])(function (tokens, req, res) {
  return JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: Number.parseFloat(tokens.status(req, res)),
    content_length: tokens.res(req, res, 'content-length'),
    response_time: Number.parseFloat(tokens['response-time'](req, res))
  });
}, {
  stream: {
    // Configure Morgan to use our custom logger with the various severity
    write: function write(message) {
      var data = JSON.parse(message);
      if (data.status >= 200 && data.status <= 226) {
        return _index.logger.info("".concat(message));
      } else if (data.status >= 400 && data.status <= 431) {
        return _index.logger.warn("".concat(message));
      } else {
        return _index.logger.error("".concat(message));
      }
    }
  }
});
var _default = morganMiddleware;
exports["default"] = _default;