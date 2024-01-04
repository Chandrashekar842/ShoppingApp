import { User } from "../models/user.js"

export const getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    })
}

export const postLogin = (req, res, next) => {
    User.findById('658a74ed79fdfbae08327788')
        .then(user => {
            req.session.isLoggedIn = true
            req.session.user = user
            res.redirect('/')
        })
        .catch(err => console.log(err))
}

export const postLogOut = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}