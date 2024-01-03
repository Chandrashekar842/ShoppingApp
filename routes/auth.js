import express from 'express'

import { getLogin } from '../controllers/auth.js'

const authrouter = express.Router()

authrouter.get('/login', getLogin)

export default authrouter