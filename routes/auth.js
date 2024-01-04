import express from 'express'

import { getLogin, postLogin, postLogOut } from '../controllers/auth.js'

const authrouter = express.Router()

authrouter.get('/login', getLogin)

authrouter.post('/login', postLogin)

authrouter.post('/logout', postLogOut)

export default authrouter