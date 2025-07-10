
import AuthModel from "../models/authSchema.js";

//To get users data
const getUserData = async (req, res) => {
    try {
        const {id} = req.params;
        const userData = await AuthModel.findById(id).select("-password");
        // If user not found
        if (!userData) {
            return res.status(404).json({ Message: "User not found" });
        }
        return res.status(200).json({userData});
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: "Server error" });
    }
}

const EditProfile = async (req, res) =>{
try {
    const{id} = req.params;
    const {name,email, bio,skills,goal}= req.body;
    const user = await AuthModel.findById(id);
    if(!user){
        return res.status(404).json({Message: "user not found"});
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.skills = skills || user.skills;
    user.goal = goal || user.goal;
    await user.save();

        return res.status(200).json({Message: "profile updated successfully",user});


} catch(error) {
    console.log(error);
    return res.status(500).json({message:"user error"});
    
}

} 

export {getUserData, EditProfile};