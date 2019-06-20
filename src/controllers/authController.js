import passport from "passport/lib";
import { validationResult } from 'express-validator/check';

module.exports = {

  showFormLogin(req, res){
    return res.render('auth/login', { title: 'Login' });
  },

  actionLogin: (req, res, next) => {
    //Validation
    let errors = validationResult(req);
    res.locals.errors = errors.array();
    if(errors && errors.array().length > 0){
      return res.render('auth/login', { 'errors': errors.array()})
    }
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: 'Welcome!'
    })(req, res, next);
  },

  actionLogout: (req, res) =>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  }
};