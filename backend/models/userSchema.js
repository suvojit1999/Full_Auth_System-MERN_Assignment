import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user_name: {type:String, required: true},
    email: {type: String, reduired: true},
    password: {type: String, required: true}
})

const userData = mongoose.model('user', UserSchema)
export default userData