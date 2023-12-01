import express from 'express'
import { login, register, google } from '../controllers/Auth.js'

const router = express.Router()

//REGISTER
router.post('/', register)

//LOGIN
router.post('/login', login)

//GOOGLE
router.post('/google', google)

export default router