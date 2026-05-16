const {Router} = require('express');
const authController = require('../controller/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');


const authRouter = Router();

authRouter.post('/register',authController.registerUser);
authRouter.post('/login',authController.loginUser);
authRouter.get("/get-me", authMiddleware.authUser, authController.getMe);
authRouter.get("/logout", authController.logoutUser);


module.exports = authRouter;