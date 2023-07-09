"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dbConfig = require("../config/db.config.js");
var _sequelize = _interopRequireDefault(require("sequelize"));
var _adminModel = _interopRequireDefault(require("../models/admin.model.js"));
var _questionsModel = _interopRequireDefault(require("../models/questions.model.js"));
var _resultsModel = _interopRequireDefault(require("../models/results.model.js"));
var _userModel = _interopRequireDefault(require("../models/user.model.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var sequelize = new _sequelize["default"](_dbConfig.DB, _dbConfig.USER, _dbConfig.PASSWORD, {
  host: _dbConfig.HOST,
  dialect: _dbConfig.dialect,
  logging: _dbConfig.logging,
  operatorsAliases: 0,
  pool: {
    max: _dbConfig.pool.max,
    min: _dbConfig.pool.min,
    acquire: _dbConfig.pool.acquire,
    idle: _dbConfig.pool.idle
  },
  dialectOptions: {
    // useUTC: _dialectOptions.useUTC, 
    dateStrings: _dbConfig.dialectOptions.dateStrings,
    typeCast: _dbConfig.dialectOptions.typeCast
  },
  timezone: _dbConfig.timezone
});
var db = {};
db.Sequelize = _sequelize["default"];
db.sequelize = sequelize;
db.admin = (0, _adminModel["default"])(sequelize, _sequelize["default"]);
db.user = (0, _userModel["default"])(sequelize, _sequelize["default"]);
db.questions = (0, _questionsModel["default"])(sequelize, _sequelize["default"]);
db.results = (0, _resultsModel["default"])(sequelize, _sequelize["default"]);

//    - Questions Associations
db.questions.hasMany(db.admin, {
  foreignKey: 'unique_id',
  sourceKey: 'admin_unique_id'
});
db.admin.belongsTo(db.questions, {
  foreignKey: 'unique_id',
  sourceKey: 'admin_unique_id'
});

//    - Results Associations
db.results.hasMany(db.user, {
  foreignKey: 'unique_id',
  sourceKey: 'user_unique_id'
});
db.user.belongsTo(db.results, {
  foreignKey: 'unique_id',
  sourceKey: 'user_unique_id'
});
var _default = db;
exports["default"] = _default;