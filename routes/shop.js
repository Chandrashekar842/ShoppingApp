import express from 'express'
import { displayProducts, moreProducts, getProduct, postCart, getCart, postDeleteCartProduct, postOrder, getOrders } from '../controllers/shop.js'

const shoprouter = express.Router();

shoprouter.get('/', moreProducts)

shoprouter.get('/products', displayProducts)

shoprouter.get('/products/:productId', getProduct)

// shoprouter.get('/cart', getCart)

// shoprouter.post('/cart', postCart)

// shoprouter.post('/delete-cart-item', postDeleteCartProduct)

// shoprouter.post('/create-order', postOrder)

// shoprouter.get('/orders', getOrders)

// shoprouter.get('/checkout', checkoutProducts)

export default shoprouter