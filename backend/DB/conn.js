import 'dotenv/config'
import mongoose from 'mongoose'

const user = process.env.user
const password = process.env.password
const URI= `mongodb+srv://${user}:${password}@cluster1.gfixpdd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1/assignment`

mongoose.connect(URI).then(()=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log("error:", err)
})