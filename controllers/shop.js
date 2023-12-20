import {Product} from '../models/product.js'

export const errorPage = (req, res, next) => {
    res.redirect('/404')
}

export const displayProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/product-list', {prods: products, pageTitle: "Products", path: "/products"})
    })
}

export const moreProducts = (req,res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/index', {prods: products, pageTitle: "Shop", path: "/"})
    })
}

export const getProduct = (req, res, next) => {
    const prodId = req.params.productId
    Product.fetchProduct(prodId).then(product => {
        res.render('shop/product-detail', {prod: product, pageTitle: product.title, path: "/products"})
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
        })
}