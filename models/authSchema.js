import mongoose from "mongoose";
const authSchema = new  mongoose.Schema({
    name: { type:String, required:true},
    email: { type:String, required:true, unique:true},
    password: {type:String, required:true, unique:true},
    role: {type:String, required:true,
        enum:["admin", "mentor","mentee"],
        default: "mentee"
    }   
}, {timestamps:true},
{minimize: false},

)
const AuthModel = mongoose.model.users || mongoose.model("users", authSchema);
export default AuthModel;
    