import Router from "express";
import PostController from "../controlers/post_controller.js"

const postRouter = Router();

postRouter.post("/", PostController.postTwit);
postRouter.get("/:email", PostController.getAllPostsByEmail);
postRouter.get("/", PostController.getAllPosts);
postRouter.put("/:id", PostController.updateById);

export default postRouter;