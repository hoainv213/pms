import { validationResult } from 'express-validator/check';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import apiSecret from '../../config/apiSecret';
import bcrypt from "bcrypt";

module.exports = {

  actionLogin: async (req, res, next) => {
    //Validation
    let errors = validationResult(req);
    if(errors && errors.array().length > 0){
      return res.status(400).json({
        status: 400,
        success: false,
        errors: errors.array(),

      });
    }
    let user = await User.getUserByUsername(req.body.username);
    if(!user){
      return res.status(401).json({
        status: 401,
        success: false,
        message: 'That username is not registered'
      })
    }
    if(User.comparePassword(req.body.password, user.password)){
      let token = jwt.sign({id: user.id},
        apiSecret.secret,
        { expiresIn: '24h' }
      );

      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Authentication successful!',
        token: token,
        user: user.responseApi()
      })
    }else {
      return res.status(401).json({
        status: 401,
        success: false,
        message: 'Password incorrect',

      })
    }

  },

  register: async (req, res) => {

    let errors = validationResult(req);
    if(errors && errors.array().length){
      return res.status(400).json({
        status: 400,
        success: false,
        errors: errors.array(),

      });
    }
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let obj = {
      username:     req.body.username,
      fullname:     req.body.fullname,
      email:        req.body.email,
      birthday:     req.body.birthday,
      gender:       req.body.gender,
      deviceId:     req.body.deviceId,
      password:     hashPassword,
    };
    let user = await User.create(obj);
    return res.status(200).json({
      status: 200,
      success: true,
      user: user.responseApi()
    })
  }
};