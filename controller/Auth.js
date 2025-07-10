import AuthModel from "../models/authSchema.js";
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
//user Registration
const register = async (req, res) => {
    const salt = 10;
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ Message: "All fields are required" });
        }
        // If user already exists
        const existuser = await AuthModel.findOne({ email });

        if (existuser) {
            return res.status(400).json({ Message: "User already exist" });
        }
        // Hash Password
        const hashPassword = await bcrypt.hash(password, salt);

        // Create User
        const user = new  AuthModel({
            name,
            email,
            password: hashPassword,
            role
        });

        // Save User to Database
        await user.save();

        // To generate Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
        });

        // Send success response
        res.status(201).json({
            Message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: "Server error" });
    }
}
//user login controller

const login = async (req, res) =>{
    try {
const {email, password} = req.body;
if (!email || !password) {
    return res.status(400).json({ Message: "Email and password are required" }); 
}
    const user = await AuthModel.findOne({email});
    if (!user) {
        return res.status(400).json({ Message: "Invalid credentials" });   
    } 
    const isMatch = await bcrypt.compare(password, user.password);   
    if (!isMatch) {
        return res.status(400).json({ Message: "Invalid credentials" });
    } 
    // To generate Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" })
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
    })
    res.status(200).json({
        Message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ Message: "Server error" });
    }
}

//usrer logout controller
const logout = async (req, res) => {
    try {
        res.clearCookie("token",
            {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 0 // Clear the cookie
            })
        res.status(200).json({ Message: "Logout successful" });
    } catch (error) {
        res.json({ Message: "Server error" });
        console.log(error)
    }
}

//To get users data
const getUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const userdata = await AuthModel.findById(id).select("-password");
        // If user not found
        if (!userdata) {
            return res.status(404).json({ Message: "User not found" });
        }
        return res.status(200).json({userdata});
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: "Server error" });
    }
}

// Edit user profile
export const editProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;
        const updatedUser = await AuthModel.findByIdAndUpdate(
            id,
            { name, email, role },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export{register,login,logout, getUserData};