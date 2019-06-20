import User from '../models/user';
import bcrypt from 'bcrypt';

module.exports = {
  getHome(req, res) {

    User.findById('5cf6769198651a17391452c4', function (err, user) {
      bcrypt.compare( 123, user.password, function(isMatch){
        if(!isMatch) return res.render('home', { title: 'CMM'});
        return res.render('home', { title: 'Properties manager server' })
      });

    });

  },
  getDashboard(req, res) {
    let userID = req.session.passport.user;
    User.findById(userID, function (err, user) {
      return res.render('dashboard', { title: 'Dashboard', user: user });
    });

  },
};