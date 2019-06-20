import User from "../../models/user";
import _ from 'lodash';

module.exports = {
  usernameUnique: async value => {
    let user = await User.findOne({username: value});
    if (!_.isEmpty(user)) return false;
  },
  emailUnique: async value => {
    let user = await User.findOne({email: value});
    if (!_.isEmpty(user)) return false;
  },
  typeDate: value => {
    if(!value) return true;
    let bits = value.split('-');
    let date = new Date(bits[2], bits[1] - 1, bits[0]);
    return date && (date.getMonth() + 1) === parseInt(bits[1]);
  },
  confirmPassword: (value, {req}) => {
    if (value !== req.body.confirm_password) {
      return false
    } else {
      return value;
    }
  }
};