import express from 'express'
import '../DB/conn.js'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import userData from '../models/userSchema.js'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

const router = express.Router()
router.use(cookieParser());

const authenticateJwt = (req, res, next) => {
    const token = req.cookies.jwt_token

    if (!token) {
        return next()
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(400).json({ message: "token is not valid or expired, try logging in using email and password" })

        res.json({ message: "Cookie verified: user already logged in", user });
    })
}


router.get('/api/auth', async (req, res) => {
    const token = req.cookies.jwt_token;
    // console.log(token);

    if (!token) {
        return res.json({ message: "no token present. Log in first" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            // console.log(err);
            res.clearCookie('jwt_token', { httpOnly: true, secure: true, sameSite: 'None' });
            return res.status(400).json({ error: "Token is not valid or expired" });
        }


        return res.json({ message: "user is already logged in", user });
    });
});



router.post('/api/signup', async (req, res) => {

    try {
        const { user_name, email, password } = req.body;
        const hashed_password = await bcrypt.hash(password, 12)

        if (!user_name || !email || !password) {
            return res.json({ error: 'Some fields are empty, fill those first' })
        }

        const response1 = await userData.findOne({ email: email })

        if (response1) {
            // return res.json({ error: "User already exists" })
            return res.status(409).json({ error: "User already exists" });
        }

        const new_userData = new userData({
            user_name,
            email,
            password: hashed_password
        })
        const response2 = await new_userData.save()
        console.log(response2)

        return res.status(200).json({ message: "User registered successfully" })

    } catch (err) {
        return res.json({ error: "something went wrong", err })
    }
})

router.post('/api/signin', authenticateJwt, async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "either email or password is empty" })

        const accountConfirmation = await userData.findOne({ email: email })
        if (!accountConfirmation) return res.status(500).json({ error: "either email or password or both are wrong" })

        const passwordConfirmation = await bcrypt.compare(password, accountConfirmation.password)
        if (!passwordConfirmation) return res.status(500).json({ error: "either email or password or both are wrong" })

        const token = jwt.sign({ user_name: accountConfirmation.user_name, email: accountConfirmation.email }, process.env.SECRET_KEY, { expiresIn: '1hr' })

        const user = {
            user_name: accountConfirmation.user_name,
            email: accountConfirmation.email
        }
        res.cookie('jwt_token', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24*60*60*1000 })
        return res.status(200).json({ message: "login successful" , user})

    } catch (err) {
        return res.status(400).json({ message: 'something went wrong', err })
    }


})

router.post('/logout', (req, res) => {
    res.clearCookie('jwt_token', { httpOnly: true, secure: true, sameSite: 'None' });
    return res.json({ message: 'Logged out successfully' });
})



export default router