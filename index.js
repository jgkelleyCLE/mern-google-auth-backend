import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/UserRoutes.js'
import authRoutes from './routes/AuthRoutes.js'

const app = express()

app.use(express.json({ limit: "10mb" }))
app.use(cors())

dotenv.config()

const port = process.env.PORT || 3001;

//MONGOOSE
mongoose.connect(process.env.MONGO_URL)

let connectionObj = mongoose.connection

connectionObj.on('connected', ()=> {
    console.log('database connected')
})

connectionObj.on("error", ()=> {
    console.log('database ERROR')
})

//ROUTING
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
})