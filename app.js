import express from 'express'
import bodyParser from 'body-parser'
import adminrouter from './routes/admin.js'
import shoprouter from './routes/shop.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { errorPage } from './controllers/shop.js'
import { mongoConnect } from './util/database.js'
import { User } from './models/user.js'


const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(dirname, 'public')))

app.use((req, res, next) => {
   User.findById('657ff0b591fb6301f910e16d')
      .then(user => {
         req.user = new User(user.username, user.email, user.cart, user._id)
         next()
      })
      .catch(err => console.log(err))
})

app.use('/admin', adminrouter)
app.use(shoprouter)

app.use(errorPage)

mongoConnect(() => {
   app.listen(3000)
})





