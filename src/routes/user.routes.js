const userRouter = require("express").Router();
const { isAuth } = require("../_shared/middleware/auth.middleware");
const {
  getAllUsers,
  getUserById,
  getUserByAlias,
  postNewUser,
  loginUser,
  logoutUser,
  updateUserById,
  updateUserPasswordById,
  deleteUserById,
} = require("../controllers/user.controller");

userRouter.get("/", [isAuth], getAllUsers);
userRouter.get("/:id", [isAuth], getUserById);
userRouter.get("/alias/:alias", [isAuth], getUserByAlias);
userRouter.put("/:id", [isAuth], updateUserById);
userRouter.post("/logout", [isAuth], logoutUser);
userRouter.patch("/password/:id", [isAuth],updateUserPasswordById);
userRouter.delete("/:id", [isAuth], deleteUserById);
//
// Non-securitized routes
//
userRouter.post("/", postNewUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
