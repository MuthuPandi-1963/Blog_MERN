import {Router} from 'express'
import { login, refreshAuth, register, verifyEmail } from '../controllers/auth.controllers.js';


export const authRouter = Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.get('/verify-email',verifyEmail);
authRouter.get('/refresh-token',refreshAuth);

