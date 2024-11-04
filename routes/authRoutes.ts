import express from 'express'
import asyncHandler from 'express-async-handler'
import { addUser, allUsers, deleteUser, loginUser, userProfile, updateUser } from '../controller/authCntrl';

const router = express.Router();

router.post('/register', asyncHandler(addUser));
router.post('/login', asyncHandler(loginUser));
router.get('/all-users', asyncHandler(allUsers));
router.get('/:id', asyncHandler(userProfile));
router.delete('/delete/:id', asyncHandler(deleteUser));
router.put('/update/:id', updateUser)


export default router;
