import User from "../models/user.js";

class UserService{
    async create(user){
        return await User.create(user);
    }


    async findUserByEmail (requestEmail){
        return User.findOne({email: requestEmail});
    }

    async deleteAll (){
        return User.deleteMany();
    }

    async getAll(){
        return User.find();
    }
}

export default new UserService();