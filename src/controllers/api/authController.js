import { validationResult } from 'express-validator/check';
import User from '../../models/user';
import {getUserIdeByToken} from '../../middlewares/apiMiddleware';

module.exports = {

  updateProfile: async (req, res) => {

    let userIdToken = getUserIdeByToken(req, res);
    let errors = validationResult(req);
    if(errors && errors.array().length){
      return res.status(400).json({
        status: 400,
        success: false,
        errors: errors.array(),

      });
    }

    if(userIdToken !== req.params.userId){
      return res.status(401).json({
        status: 401,
        success: false,
        errors: 'Permission denied'
      })
    }
    User.findByIdAndUpdate(req.params.userId, {$set: req.body}, {new: true}, function (err, user) {
      if (err){
        return res.status(500).json({
          status: 500,
          success: false,
          errors: err
        })
      }
      return res.status(200).json({
        status: 200,
        success: true,
        user: user.responseApi()
      })
    });
  }
};