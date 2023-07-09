"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _index = require("../middleware/index.js");
var _adminController = require("../controllers/admin.controller.js");
var _userController = require("../controllers/user.controller.js");
var _questionsController = require("../controllers/questions.controller.js");
var _resultsController = require("../controllers/results.controller.js");
var _adminRules = require("../rules/admin.rules.js");
var _userRules = require("../rules/user.rules.js");
var _questionsRules = require("../rules/questions.rules.js");
var _resultsRules = require("../rules/results.rules.js");
function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  // Question routes ------
  app.get("/api/questions", _questionsController.getQuestions);
  app.get("/api/question", [_questionsRules.questionsRules.forFindingQuestion], _questionsController.getQuestion);
  app.get("/api/backoffice/questions", [_index.authJwt.verifyToken, _index.authJwt.isAdmin], _questionsController.getAdminQuestions);
  app.get("/api/backoffice/question", [_index.authJwt.verifyToken, _index.authJwt.isAdmin, _questionsRules.questionsRules.forFindingQuestion], _questionsController.getQuestion);
  app.post("/api/backoffice/question", [_index.authJwt.verifyToken, _index.authJwt.isAdmin, _questionsRules.questionsRules.forAdding], _questionsController.addQuestion);
  app.put("/api/backoffice/question", [_index.authJwt.verifyToken, _index.authJwt.isAdmin, _questionsRules.questionsRules.forUpdating], _questionsController.updateQuestion);
  app["delete"]("/api/backoffice/question", [_index.authJwt.verifyToken, _index.authJwt.isAdmin, _questionsRules.questionsRules.forFindingQuestion], _questionsController.removeQuestion);
  // ----- Question routes

  // Admin routes -----

  app.get("/api/backoffice/admins", [_index.authJwt.verifyToken, _index.authJwt.isAdmin], _adminController.getAdmins);
  app.get("/api/backoffice/users", [_index.authJwt.verifyToken, _index.authJwt.isAdmin], _userController.getUsers);
  app.get("/api/backoffice/admin", [_index.authJwt.verifyToken, _index.authJwt.isAdmin, _adminRules.adminRules.forFindingAdmin], _adminController.getAdmin);
  app.put("/api/backoffice/admin", [_index.authJwt.verifyToken, _index.authJwt.isAdmin, _adminRules.adminRules.forUpdating], _adminController.updateAdmin);
  app["delete"]("/api/backoffice/admin", [_index.authJwt.verifyToken, _index.authJwt.isAdmin, _adminRules.adminRules.forFindingAdmin], _adminController.removeAdmin);

  // ----- Admin routes

  // User routes -----

  app.get("/api/user", [_index.authJwt.verifyToken, _index.authJwt.isUser], _userController.getUser);
  app.put("/api/user", [_index.authJwt.verifyToken, _index.authJwt.isUser, _userRules.userRules.forUpdating], _userController.updateUser);
  app["delete"]("/api/user", [_index.authJwt.verifyToken, _index.authJwt.isAdmin, _userRules.userRules.forFindingUser], _userController.removeUser);

  // ----- User routes

  // Result routes -----

  app.post("/api/result", [_index.authJwt.verifyToken, _index.authJwt.isUser, _resultsRules.resultsRules.forAdding], _resultsController.addResult);
  app.get("/api/backoffice/results", [_index.authJwt.verifyToken, _index.authJwt.isAdmin], _resultsController.getAllResults);
  app.get("/api/results/", [_index.authJwt.verifyToken, _index.authJwt.isUser], _resultsController.getUserResults);

  // ----- Result routes
}
;