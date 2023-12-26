import express from 'express'
import { getAddProduct, postAddProduct, productsForAdmin, getEditProduct, postEditProduct, deleteProduct} from '../controllers/admin.js'

const adminrouter = express.Router()

adminrouter.get('/add-product', getAddProduct)

adminrouter.post('/add-product', postAddProduct)

adminrouter.get('/products', productsForAdmin)

adminrouter.get('/edit-product/:productId', getEditProduct)

adminrouter.post('/edit-product', postEditProduct)

adminrouter.post('/delete-product/:productId', deleteProduct)

export default adminrouter; 