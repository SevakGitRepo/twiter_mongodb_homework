import mongoose from "mongoose";

let validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const User = new mongoose.Schema({
    first_name: {type: String, required: true, minlength: 3, maxlength: 50},

    last_name: {type: String, required: true, minlength: 3, maxlength: 50 },

    age: {type: Number, required: true, min: 18, max: 80},

    email: {type: String, required: true, validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},

    password: {type: String, required: true }
});



export default mongoose.model("User", User);