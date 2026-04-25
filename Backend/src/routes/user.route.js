import router from "express";
import userController from "../controllers/user.controller.js";
import auth from '../middlewares/auth.middleware.js';

const userRouter=router();

userRouter.get('/me',auth,userController.getUserDetails);

export default userRouter;