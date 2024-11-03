import express from 'express'
import asyncHandler from 'express-async-handler'
import { addUser, allUsers, loginUser, userProfile } from '../controller/authCntrl';

const router = express.Router();

router.post('/register', asyncHandler(addUser));
router.post('/login', asyncHandler(loginUser));
router.get('/all-users', asyncHandler(allUsers));
router.get('/:id', asyncHandler(userProfile));


export default router;
