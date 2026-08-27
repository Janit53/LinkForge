import { Router } from 'express';
import { userLoginController, userRegisterController, getCurrentUserController, userLogOutController } from '../controllers/user.controller.js';
import { userAuthMiddleware } from '../middlewares/userAuthMiddleware.js';

const router = Router();

router.post('/register', userRegisterController)
router.post('/login', userLoginController)

// Protected routes
router.get('/current-user', userAuthMiddleware, getCurrentUserController)
router.post('/logout', userAuthMiddleware, userLogOutController)

export default router;