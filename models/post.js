import mongoose from "mongoose";

const Post = new mongoose.Schema({
   author: {type: String, required: true},
   title: {type: String, required: true, maxlength: 50},
   content: {type: String, required: true, minlength: 10, maxlength: 500},
});

export default mongoose.model("Post", Post);