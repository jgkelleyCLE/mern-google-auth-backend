import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const updateUser = async(req, res) => {

    const userId = req.user.id
    console.log(userId)

    if(userId !== req.params.id){
        return res.status(400).json({ message: "Not authorized to update" })
    }

    try {
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }

        // const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        //     $set: {
        //         username: req.body.username,
        //         email: req.body.email,
        //         password: req.body.password,
        //         profilePicture: req.body.profilePicture,
                
        //     }
        // }, { new: true })

        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }) 


        res.status(200).json(updatedUser)
        
        // const { password, ...others } = updatedUser._doc
        // res.status(200).json(others)
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}