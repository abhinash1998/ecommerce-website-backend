import { Router } from 'express';
import { signinUser, signupUser } from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/signup', signupUser);
userRouter.post('/login', signinUser);

export default userRouter;
