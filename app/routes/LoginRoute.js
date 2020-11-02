const LoginRouter = require("express").Router();
const RegisterRouter = require("express").Router();

const LoginController = require("../controllers/LoginController");

LoginRouter.post("/", LoginController.authenticate);
RegisterRouter.post("/", LoginController.register);

module.exports = {
  LoginRouter,
  RegisterRouter,
};
