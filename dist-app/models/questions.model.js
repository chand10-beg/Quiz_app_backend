"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _adminModel = _interopRequireDefault(require("./admin.model.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(sequelize, Sequelize) {
  var admins = (0, _adminModel["default"])(sequelize, Sequelize);
  var Question = sequelize.define("questions", {
    unique_id: {
      type: Sequelize.STRING(40),
      allowNull: false,
      unique: true
    },
    admin_unique_id: {
      type: Sequelize.STRING(40),
      allowNull: false,
      references: {
        model: admins,
        key: "unique_id"
      }
    },
    question: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    option1: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    option2: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    option3: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    option4: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    answer: {
      type: Sequelize.STRING(10),
      allowNull: false
    }
  });
  return Question;
};
exports["default"] = _default;