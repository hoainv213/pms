import jwt from 'jsonwebtoken';
import apiSecret from '../config/apiSecret';
import User from '../models/user';

module.exports = {
  apiToken: ( req, res, next ) =>{
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(token){
      if(token.startsWith('Bearer ')){
        token = token.slice(7, token.length);
      }
      jwt.verify(token, apiSecret.secret, (err, decoded) => {
        if(err){
          return res.status(403).json({
            success: false,
            message: 'Token is not valid'
          })
        }
        req.decoded = decoded;
        next();
      })
    }else {
      return res.status(401).json({
        success: false,
        message: 'Auth token is not supplied'
      })
    }
  },

  getUserIdeByToken: (req, res) => {
    let authorization, decode;
    authorization = req.headers['x-access-token'] || req.headers['authorization'];
    try {
      decode = jwt.verify(authorization, apiSecret.secret);
    } catch (e) {
      return res.status(401).send('unauthorized');
    }
    return decode.id;
  }
};