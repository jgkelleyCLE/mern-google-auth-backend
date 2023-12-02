import express from 'express'
import { auth } from '../middleware/auth.js'
import { updateUser } from '../controllers/User.js'

const router = express.Router()

router.put('/update/:id', auth, updateUser)

export default router