import { Router } from 'express';

import {
  signupMiddleware,
  loginMiddleware,
  authorizeMiddleware,
} from '../middlewares/auth.middleware.js';
import {
  signupController,
  loginController,
  logoutController,
  checkAuthStatusController,
} from '../controllers/auth.controller.js';
const app = Router();

app.post('/signup', signupMiddleware, signupController);

app.post('/login', loginMiddleware, loginController);

app.get('/logout', authorizeMiddleware, logoutController);

app.get('/checkStatus', checkAuthStatusController);

export default app;
