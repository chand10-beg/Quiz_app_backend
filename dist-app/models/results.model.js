"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _userModel = _interopRequireDefault(require("./user.model.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(sequelize, Sequelize) {
  var users = (0, _userModel["default"])(sequelize, Sequelize);
  var Result = sequelize.define("results", {
    unique_id: {
      type: Sequelize.STRING(40),
      allowNull: false,
      unique: true
    },
    user_unique_id: {
      type: Sequelize.STRING(40),
      allowNull: false,
      references: {
        model: users,
        key: "unique_id"
      }
    },
    percentage: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
  return Result;
};
exports["default"] = _default;