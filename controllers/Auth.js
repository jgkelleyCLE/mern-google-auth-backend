import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
import { generateToken } from '../middleware/generateToken.js'


//REGISTER
export const register = async(req, res) => {

    const { username, email, password } = req.body

    const usernameExists = await User.findOne({ username })

    if(usernameExists){
        return res.status(400).json({ message: "A user with that username already exists!" })
    }

    const emailExists = await User.findOne({ email })

    if(emailExists){
        return res.status(400).json({ message: "A user with that email already exists!" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        if(newUser){
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
                token: generateToken(newUser._id)
            })
        }else {
            res.status(400).json({ message: "Unable to register new user" })
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


//LOGIN
export const login = async(req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if(!user){
            return res.status(404).json({ message: "User not found!" })
        }

        if(user && (await bcrypt.compare(password, user.password))){

            const token = generateToken(user._id)

            res.cookie('access_token', token, { httpOnly: true }).status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
                token: generateToken(user._id),
                
            })
            // res.cookie('access_token', token, { httpOnly: true })
        }else {
            res.status(400).json({ message: "Invalid credentials" })
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//GOOGLE
export const google = async(req, res) => {

    const { name, email, photo } = req.body

    // console.log(req.body)

    try {

        const user = await User.findOne({ email: req.body.email })


        if(user){
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
                token: generateToken(user._id),
                
            })
        }else {
            const generatedPassword = Math.random().toString(36).slice(-8)
            const hashedPassword = await bcrypt.hash(generatedPassword, 10)

            const newUser = await User.create({
                // username: req.body.name,
                username: name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email,
                password: hashedPassword,
                profilePicture: photo
            })
            
            if(newUser){
                res.status(201).json({
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    profilePicture: newUser.profilePicture,
                    token: generateToken(newUser._id)
                })
            }
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }


}



