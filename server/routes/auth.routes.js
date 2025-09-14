import {Router} from 'express'
import { register, verifyEmail } from '../controllers/auth.controllers.js';


export const authRouter = Router();

authRouter.post("/register",register);
authRouter.get('/verify-email',verifyEmail);

