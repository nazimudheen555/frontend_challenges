import jwt from 'jsonwebtoken'

const generateToken = (id: string): string => {    
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "2 days" })
}

export default generateToken;