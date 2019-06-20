import {body} from 'express-validator/check';
import {usernameUnique, emailUnique, typeDate, confirmPassword} from './customFunctions/custom';

const authValidation = method => {
  switch (method) {
    case 'login': {
      return [
        body('username', 'Username is required').not().isEmpty(),
        body('password', 'Password is required').not().isEmpty(),
      ]
    }
    case 'register': {
      return [
        body('username')
          .not().isEmpty().withMessage('Username is required')
          .custom(usernameUnique).withMessage('username already exits'),
        body('fullname', 'Full name is required').not().isEmpty(),
        body('email')
          .not().isEmpty().withMessage('Email is required')
          .isEmail().withMessage('Email invalid')
          .custom(emailUnique).withMessage('Email already exits'),
        body('birthday').custom(typeDate).withMessage('Birthday invalid'),
        body('password')
          .not().isEmpty().withMessage('Password is required')
          .isLength({ min: 6 }).withMessage('Password need more than 6 character')
          .custom(confirmPassword).withMessage('Passwords don\'t match')
      ]
    }
    case 'update-profile': {
      return [
        body('username').isEmpty().withMessage('Username can\'t update'),
        body('email').isEmpty().withMessage('Email can\'t update'),
        body('type').isEmpty().withMessage('Type can\'t update'),
        body('fullname', 'Full name is required').not().isEmpty(),
        body('birthday').custom(typeDate).withMessage('Birthday invalid')
      ]
    }
  }
};
export default authValidation;