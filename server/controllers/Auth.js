


        //  SIGNUP CONTROLLERS

const signup = async (req,res) => {
    try{

        const {userName,email,password} = req.body;

        //1. check if the user is already present

        //2.Hash the password

        //3.Creating a new user

        //4. Save the user to the database

        //5.Generate a jwt token

        //6.return true
    }

    catch(error){
        console.log("Signup error:",error);
        res.status(500).json({
            message:"Server error during signup"
        });
    }
};


        // LOGIN CONTROLLERS

const login = async (req,res) => {
    try{

        const {email,password} = req.body;

        //1.Check if the user exists

        //2.Compare the password with the hashed password stored

        //3.Generate a jwt token

        //4.return true
    }

    catch(error){
        console.log("Login error",error);
        res.status(500).json({
            message:"Server error during login"
        });
    }
};

module.exports = {signup,login};