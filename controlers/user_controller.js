import UserService from "../service/user_service.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import KEYS from "../config/config.js";

class UserController {
    //localhost:8080/users/register
    async register(req, res) {
        try {

            const body = req.body;
            //Hash password
            const salt = bcrypt.genSaltSync(10);
            body.password = bcrypt.hashSync(req.body.password, salt);

            //create if not exist
            const candidate = await UserService.findUserByEmail(req.body.email)
            if (candidate) {
                res.status(409).json({message: "User already is exist. Please enter another email"})
            } else {
                const user = await UserService.create(body);
                res.status(201).json(user);
            }

        } catch (e) {
            if (e.name === "ValidationError") {
                res.status(400).json(e);
            } else {
                res.status(500).json(e);
            }
        }
    }

    //localhost:8080/users/login
    async login(req, res) {
        try {
            const candidate = await UserService.findUserByEmail(req.body.email);
            if(!candidate){
                res.status(401).json({message: "Please enter valid email"})
            }else{
                const ifExist = bcrypt.compareSync(req.body.password, candidate.password);
                //Ete normal e tur token
                if(ifExist){
                     const token = jwt.sign({email: candidate.email}, KEYS.SECRET_KEY, {expiresIn: 10*60})   // 10 rope valid e token@

                    res.status(200).json({token: token});
                }else {
                    res.status(401).json({message: "Please enter true password"})
                }
            }
        } catch (e) {
            res.status(500).json(e);
        }
    }

    //localhost:8080/users
    async deleteAll(req, res) {
        try {
            await UserService.deleteAll();
                res.status(200).json({message: "All deleted"});
        } catch (e) {
            res.status(500).json(e);
        }
    }

    //localhost:8080/users
    async getAll(req, res) {
        try {
            let users = await UserService.getAll();
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new UserController();