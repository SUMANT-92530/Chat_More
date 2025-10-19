import cloudinary from '../config/cloudinary.js';
import User from '../models/User.js';

        // controllers to update user profile

export const updateProfile = async (req,res) => {

    try{

        const {profilePic, bio, fullName} = req.body;

       const userId = req.user.userId;
        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName}, {new:true});
        }
        else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, 
                {profilePic:upload.secure_url, bio, fullName}, {new:true});
        }

        res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully"
        });

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error while updating profile"
        });
    }
}

export const getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.userId;
        const userDetails = await User.findById(id)
            .exec();
        console.log(userDetails);
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};