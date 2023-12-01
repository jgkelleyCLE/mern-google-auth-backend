import express from 'express'
import { login, register } from '../controllers/Auth.js'

const router = express.Router()

//REGISTER
router.post('/', register)

//LOGIN
router.post('/login', login)

export default router