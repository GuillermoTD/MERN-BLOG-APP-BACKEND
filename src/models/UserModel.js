import mongoose,{ Schema } from "mongoose";

const UserSchema = new Schema({
    username:{type:String,require:true, unique:true},
    password:{type:String,require:true},
    email:{type:String,require:true, unique:true},
})

const UserModel = mongoose.model("users",UserSchema)

export default UserModel
