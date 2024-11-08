import jsonwebtoken from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/UserModal'
import { NextFunction, Request, Response } from 'express'

const checkToken = asyncHandler((req: Request, res: Response, next: NextFunction) => { 
    if(req.headers.authorization?.startsWith('Bearer')) {
        
        const token = req.headers.authorization?.split(' ')[1];
        if(token) {
            const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET as string)
            console.log({ decode });
            next()
        } else {
            throw new Error('You are not authorized')
        }

    } else {
        throw new Error('You are not authorized')
    }
})

export default checkToken;