import express from 'express'
import bodyParser from 'body-parser'
import adminrouter from './routes/admin.js'
import shoprouter from './routes/shop.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { errorPage } from './controllers/shop.js'
import { User } from './models/user.js'
import mongoose from 'mongoose'
import { getDefaultAutoSelectFamily } from 'net'


const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(dirname, 'public')))

app.use((req, res, next) => {
   User.findById('658a74ed79fdfbae08327788')
      .then(user => {
         req.user = user
         next()
      })
      .catch(err => console.log(err))
})

app.use('/admin', adminrouter)
app.use(shoprouter)

app.use(errorPage)

mongoose.connect('mongodb+srv://Chandu21:Chandu21@cluster0.0sbmxs4.mongodb.net/shop?retryWrites=true&w=majority')
      .then(result => {
         User.findOne().then(user => {
            if(!user) {
               const user = new User({
                  name: "Chandu",
                  email: "chandu@mial.com",
                  cart: {
                     items: []
                  }
               })
               user.save()
            }
         })
         app.listen(3000, () => {
            console.log('Connected to Database using Mongoose')
         })
      })
      .catch(err => console.log(err))





