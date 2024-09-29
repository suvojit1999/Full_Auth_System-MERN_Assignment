import express from 'express'
// import './DB/conn.js'
import cors from 'cors'
import auth from './apis/auth.js'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())
app.use('/', auth)

app.get('/', (req, res)=>{
    res.send("Hallo World")
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})