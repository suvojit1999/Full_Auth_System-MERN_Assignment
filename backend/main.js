import express from 'express'
// import './DB/conn.js'
import cors from 'cors'
import auth from './apis/auth.js'
import 'dotenv/config'
import axios from 'axios'

const app = express()
const port = process.env.PORT || 3000

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
// }))
app.use(cors({
    origin: 'https://full-auth-system-mern-assignment-cf5rwiz19.vercel.app',
    credentials: true,
}))
app.use(express.json())
app.use('/', auth)

app.get('/', (req, res)=>{
    res.send("Hallo World")
})


//I usually face problems deploying backend servers to vercel, so I am deploying this backend to render (I will still deploy the frontend to vercel as asked). But render's free service has a policy of shutting down the server if it is inactive for 50sec, and if sent request to the backend after that 50secs , it takes a lot of time to restart the server again. so I am adding a piece of code here that will keep sending request to it's own server in every 30 secs, so that the render server never shuts down...

const siteUrl = "https://full-auth-system-mern-assignment-backend.onrender.com";
const interval = 30000; 

function reloadWebsite() {
  axios.get(siteUrl)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

setInterval(reloadWebsite, interval);



app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})