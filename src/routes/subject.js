const express = require("express");
const SubjectController = require("../controllers/subject");
const middleware_user_authenticated = require("../middleware/authenticated_user");
const api = express.Router();

api.post("/createSubject",SubjectController.createSubject);
api.get("/subject",[middleware_user_authenticated.ensureAuth],SubjectController.getsubjects);
api.get("/getVersionPiia/:version",SubjectController.getVersionPiia);
api.delete("/deletsubject/:id",[middleware_user_authenticated.ensureAuth],SubjectController.deletSubject);
api.put("/updateSubjects/:id",[middleware_user_authenticated.ensureAuth],SubjectController.updateSubjects);
api.get("/activesubjects",[middleware_user_authenticated.ensureAuth],SubjectController.getActiveSubjects);
api.put("/activatesubject/:id",[middleware_user_authenticated.ensureAuth],SubjectController.activateSubjects);
api.put("/activatesubject/:id",[middleware_user_authenticated.ensureAuth],SubjectController.getInactiveSubjects);


module.exports = api;
