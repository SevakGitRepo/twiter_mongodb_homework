import express from "express";
import morgan from "morgan";
import userRouter from "./routers/user_router.js"
import postRouter from "./routers/post_router.js"
import KEYS from "./config/config.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(morgan("short"));//url neri hamar
app.use(express.urlencoded({extended:true}));//Postmani hamara

app.use("/users", userRouter);
app.use("/posts", postRouter);

async function startApp() {
    try {
        await mongoose.connect(KEYS.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(KEYS.PORT, () => console.log("Server start on port " + KEYS.PORT));
    }catch (e){
        console.log(e);
    }
}

startApp().then(()=>console.log("Application started"));