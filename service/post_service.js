import Post from "../models/post.js";

class PostService{
    async createPost(post){
        return await Post.create(post);
    }

    getAllByEmail(email) {
        return Post.find({author: email});
    }

    getAll() {
        return Post.find();
    }

    async update(post, id){
        console.log((await Post.findById(id)).author)
        //nayum enq vor urish@ valid tokenov chkarena poxi
        if(post.author === (await Post.findById(id)).author) {
            return Post.findByIdAndUpdate(id, post, {new: true});
        }else {
           return "You can change only your post";
        }

    }
}

export default new PostService();