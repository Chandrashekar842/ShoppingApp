import express from 'express'
import bodyParser from 'body-parser'
import adminrouter from './routes/admin.js'
import shoprouter from './routes/shop.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { errorPage } from './controllers/shop.js'
// import { User } from './models/user.js'
import mongoose from 'mongoose'


const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(dirname, 'public')))

app.use((req, res, next) => {
   User.findById('6589062d8b74e03c72aa3c85')
      .then(user => {
         req.user = new User(user.name, user.email, user.cart, user._id)
         next()
      })
      .catch(err => console.log(err))
})

app.use('/admin', adminrouter)
app.use(shoprouter)

app.use(errorPage)

mongoose.connect('mongodb+srv://Chandu21:Chandu21@cluster0.0sbmxs4.mongodb.net/shop?retryWrites=true&w=majority')
      .then(result => {
         app.listen(3000, () => {
            console.log('Connected to Database using Mongoose')
         })
      })
      .catch(err => console.log(err))





