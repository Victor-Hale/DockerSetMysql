import express from 'express';
import userController from '../http/controllers/users.js';

const router = express.Router();

router.get('/get',userController.index);

export default router;