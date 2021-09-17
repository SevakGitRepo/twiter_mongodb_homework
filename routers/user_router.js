import Router from "express";
import  UserController from "../controlers/user_controller.js";

const userRouter = Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.delete("/", UserController.deleteAll);
userRouter.get("/", UserController.getAll);

export default userRouter;
