import jwt from "jsonwebtoken";
import KEYS from "../config/config.js";
import Post from "../models/post.js";
import PostService from "../service/post_service.js"

class PostController{

    //localhost:8080/posts
    async postTwit(req, res){
            if(!req.headers.authorization){
                res.status(401).json({message: "Token is empty"})
            }else {
                const token = req.headers.authorization.split(" ")[1];

                try {
                    let valid = jwt.verify(token, KEYS.SECRET_KEY);
                    let newPost = req.body;
                    newPost.author = valid.email;

                    let post = await PostService.createPost(newPost);
                    await res.status(200).json(post);
                } catch (e) {
                    res.status(401).json({message: "Token is invalid or expired"});
                }
            }
    }

    //localhost:8080/posts
    async updateById(req, res){
        try {
            if(!req.headers.authorization){
                res.status(401).json({message: "Token is empty"})
            }else {
                const token = req.headers.authorization.split(" ")[1];

                try {
                    let verify = jwt.verify(token, KEYS.SECRET_KEY);
                    let newPost = req.body;
                    newPost.author = verify.email


                    const updatePost = await PostService.update(newPost, req.params.id);
                    res.status(200).json(updatePost);
                } catch (e) {
                    res.status(401).json({message: "Token is invalid or expired"});
                }
            }

        }catch (e) {
            res.status(500).json(e);
        }
    }

    //localhost:8080/posts/:email
    async getAllPostsByEmail(req, res){
        const posts = await PostService.getAllByEmail(req.params.email)
        res.status(200).json(posts);
    }

    //localhost:8080/posts
    async getAllPosts(req, res){
        const posts = await PostService.getAll()
        res.status(200).json(posts);
    }
}

export default new PostController();