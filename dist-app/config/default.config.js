"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAdmin = createAdmin;
var _uuid = require("uuid");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _index = _interopRequireDefault(require("../models/index.js"));
var _index2 = require("../common/index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var hashSync = _bcryptjs["default"].hashSync;
var Admin = _index["default"].admin;
var Questions = _index["default"].questions;
var createDefaultQuestions = function createDefaultQuestions(admin_unique_id) {
  var questions = [{
    admin_unique_id: admin_unique_id,
    unique_id: (0, _uuid.v4)(),
    question: "What's the name of star actors in the film Central Intelligence?",
    option1: "Rock and Hart",
    option2: "The Rock and Kevin",
    option3: "Dwayne Johnson and Kevin Hart",
    option4: "Hart and Rock head",
    answer: "Option 3"
  }, {
    admin_unique_id: admin_unique_id,
    unique_id: (0, _uuid.v4)(),
    question: "What's the name of star actor in the series The Blacklist?",
    option1: "Raymond Reddington",
    option2: "Hisan Hassani",
    option3: "Elizabeth Jefferson",
    option4: "James Spader",
    answer: "Option 4"
  }];
  Questions.bulkCreate(questions).then(function (res) {
    _index2.logger.warn('Added question defaults');
  })["catch"](function (err) {
    _index2.logger.error('Error adding question defaults');
  });
};
function createAdmin() {
  var details = {
    unique_id: (0, _uuid.v4)(),
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@example.com",
    password: hashSync("John-Doe-1", 8)
  };
  Admin.findOne({
    where: {
      email: details.email
    }
  }).then(function (admin) {
    if (!admin) {
      Admin.create(details).then(function (res) {
        createDefaultQuestions(res.unique_id);
        _index2.logger.warn('Added admin defaults');
      })["catch"](function (err) {
        _index2.logger.error('Error adding admin defaults');
      });
    }
  })["catch"](function (err) {
    _index2.logger.error('Error getting default admin');
  });
}
;