// import { Product } from '../models/product.js'
import mongodb from 'mongodb'

export const getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add-Product',
    path: '/admin/add-product',
    editing: false
  })
}

export const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, price, description, null, req.user._id);
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
};

export const productsForAdmin = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', { prods: products, pageTitle: 'Admin Products', path: '/admin/products' })
    })
}

export const getEditProduct = (req, res, next) => {
  const edit = req.query.edit
  if (!edit) {
    res.redirect('admin/products')
  }
  const prodId = req.params.productId
  Product.fetchProduct(prodId)
    .then(product => {
      res.render('admin/edit-product', { product: product, pageTitle: 'Edit product', path: '/admin/products', editing: true })
    })
}

export const postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedImageUrl = req.body.imageUrl
  const updatedPrice = req.body.price
  const updatedDescription = req.body.description
  const product = new Product(updatedTitle, updatedImageUrl, updatedPrice, updatedDescription, new mongodb.ObjectId(prodId))
  product.save()
    .then(result => {
      console.log(result)
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

export const deleteProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.deleteById(prodId)
    .then(() => {
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}



