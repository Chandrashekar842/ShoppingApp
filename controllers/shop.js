import { Product } from '../models/product.js'

export const errorPage = (req, res, next) => {
    res.redirect('/404')
}

export const displayProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/product-list', { prods: products, pageTitle: "Products", path: "/products" })
    })
}

export const moreProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/index', { prods: products, pageTitle: "Shop", path: "/" })
    })
}

export const getProduct = (req, res, next) => {
    const prodId = req.params.productId
    Product.fetchProduct(prodId).then(product => {
        res.render('shop/product-detail', { prod: product, pageTitle: product.title, path: "/products" })
        console.log(product)
    })
}

export const postCart = (req, res, next) => {
    const prodId = req.body.productId
    return Product.fetchProduct(prodId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            console.log(result)
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

export const getCart = (req, res, next) => {
    req.user.getCart()
        .then(products => {
            res.render('shop/cart', { path: '/cart', pageTitle: 'Your Cart', products: products })
        })
        .catch(err => console.log(err))
}

export const postDeleteCartProduct = (req, res, next) => {
    const productId = req.body.productId
    
    req.user.deleteItemFromCart(productId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
}

export const postOrder = (req, res, next) => {
    req.user.addOrder()
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
}

export const getOrders = (req, res, next) => {
    req.user.getOrders()
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle:'Your Orders',
                orders: orders
            })
        })
        .catch(err => console.log(err))
}