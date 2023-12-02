import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

export const auth = async(req, res, next) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from token
            req.user = await User.findById(decoded.id).select('-password')

            next()
            
        } catch (error) {
            res.status(400).json({ message: "Not authorized" })
        }
        
    }else {
        res.status(400).json({ message: "Not authorized, no token" })
    }

}