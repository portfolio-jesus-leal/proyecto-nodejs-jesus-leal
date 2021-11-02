const userRouter = require("express").Router();
const { isAuth } = require('../_shared/middleware/auth.middleware');
const { getAllUsers, postNewUser, loginUser, logoutUser } = require("../controllers/user.controller");

userRouter.get("/", [isAuth], getAllUsers);
userRouter.post("/", postNewUser);

userRouter.post("/login", loginUser);
userRouter.post("/logout", [isAuth], logoutUser);

module.exports = userRouter;
