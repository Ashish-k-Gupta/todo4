import express from 'express'
import { getMe, login, register } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const authRoute = express.Router()

authRoute.post('/register', register);
authRoute.post('/login', login)
authRoute.get('/me', protect, getMe)

export default authRoute;