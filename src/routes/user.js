/* este controlador es como al antiguo servicio */

const express = require("express");
const UserController = require("../controllers/user.js");

const api = express.Router();

api.post("/signup", UserController.singUp);
api.post("/signin", UserController.signIn);

module.exports = api;