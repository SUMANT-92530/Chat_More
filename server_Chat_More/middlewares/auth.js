// This is the auth middleware to protect routes

// Importing required modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

// Configuring dotenv to load environment variables from .env file
dotenv.config();

// This function is used as middleware to authenticate user requests
export const auth = async (req, res, next) => {

	try {
		// Extracting JWT from request cookies, body or header
		// const token =
		// 	req.cookies.token ||
		// 	req.body.token ||
		// 	req.header("Authorization").replace("Bearer ", "");
		

	// --- START OF NEW SAFER CODE -- for fetching the token value from the header---
        let token;
        const authHeader = req.header("Authorization");

		// console.log(authHeader);

        if (authHeader && authHeader.startsWith("Bearer ")) {
            // This pulls the token from the "Authorization" header
            token = authHeader.replace("Bearer ", "");
        } else {
            // Check cookies or body as a fallback
            token = req.cookies.token || req.body.token;
        }
        // --- END OF NEW SAFER CODE ---


		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);

			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res 
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};


