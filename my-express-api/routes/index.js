import { Router } from 'express';
import * as service from '../controllers/test.controller.js';
import * as authService from '../controllers/auth.controller.js';
import 'dotenv/config';
import { jwtValidate, jwtRefreshTokenValidate } from '../middleware/authHandler.js';

const router = Router();

router.get('/', jwtValidate, service.test);
router.post('/', jwtValidate, service.test2);
router.get('/db', jwtValidate, service.test4);
router.get('/:id', jwtValidate, service.test3);

router.post("/auth/login", authService.auth)
router.post("/auth/refresh", jwtRefreshTokenValidate, authService.refreshToken)


export default router;