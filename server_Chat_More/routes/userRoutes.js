import express from 'express';
import { isAuthenticated, login, signup } from '../controllers/Auth.js';
import  {auth}  from '../middlewares/auth.js';
import { getAllUserDetails, updateProfile } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.put('/update-profile', auth, updateProfile);
userRouter.get('/check', auth, isAuthenticated);
userRouter.get('/getUserDetails', auth, getAllUserDetails)

export default userRouter;