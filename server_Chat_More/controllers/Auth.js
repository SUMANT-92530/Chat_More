import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

        //  SIGNUP CONTROLLERS

export const signup = async (req,res) => {
    try{

        const {fullName, email, password, bio } = req.body;

        if(!fullName || !email || !password || !bio){
            return res.status(400).json({
                sucess:false,
                message:"All fields are required"
            });
        }

        //1. check if the user is already present
        const userData = await User.findOne({email});
        if(userData){
            return res.status(400).json({
                success:false,
                message:"User already exists with this email"
            });
        }

        //2.Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //3.Creating a new user
        const newUser = await User.create({
            fullName,
            email,
            password:hashedPassword,
            bio
        });

        //4.Generate a jwt token
        const token = jwt.sign(
            {userId:newUser._id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        );

        //5.return true
        res.json({
            success:true,
            userData:newUser,
            token,
            message:"User registered successfully",});

    }

    catch(error){
        console.log("Signup error:",error);
        res.status(500).json({
            message:"Server error during signup in controllers"
        });
    }
};


        // LOGIN CONTROLLERS

export const login = async (req,res) => {
    console.log("--- RUNNING NEW LOGIN CODE CHECK ---"); // 👈 ADD THIS LINE
    try{

        const {email,password} = req.body;

        //1.Check if the user exists
        const userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({
                success:false,
                message:"User does not exist with this email"
            });
        }

        //2.Compare the password with the hashed password stored
        const isPasswordMatch = await bcrypt.compare(password,userData.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            });
        }

        //3.Generate a jwt token
        const token = jwt.sign(
            {userId:userData._id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        );

        //4.return true
        res.json({
            success:true,
            userData,
            token,
            message:"User logged in successfully",
        });

    }

    catch(error){
        console.log("Login error",error);
        res.status(500).json({
            message:"Server error during login"
        });
    }
};

// controllers to check if user is authenticated
export const isAuthenticated = async (req, res) => {
	try {
		// Fetch user details from the database using the userId from the decoded JWT
		const user = await User.findById(req.user.userId).select("-password");
		// Return user details in the response
		return res.json({ success: true, user });
	} catch (error) {
		// If there is an error, return 500 Internal Server Error response
		console.log("isAuthenticated error:", error);
		return res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}	
};

// module.exports = {signup,login};