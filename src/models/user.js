import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const {Schema, Model} = mongoose;


const schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
  },
  gender: {
    type: String,
  },
  deviceId: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: 'normal-user'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

class User extends Model {

  responseApi(){
    let user = this.toObject();
    delete user.password;
    delete user._id;
    return user
  }
  static async create(obj) {
    try {
      let user = await new this(obj);
      user.save(err => {
        if (err) throw new err;
        return user;
      });
    }catch (err) {
      throw new err
    }
  }

  // static async update(id, obj, {res}){
  //   let user = await this.getUserById(id);
  //   if(!user){
  //     return res.status(401).json({
  //       status: 401,
  //       success: false,
  //       message: 'User does not exist',
  //     });
  //     user.save();
  //   }
  // }

  static async getUserByUsername(username){
    try {
      return await this.findOne({username: username});
    } catch (err) {
      throw new err
    }
  }

  static async getUserById(id){
    try {
      return await this.findOne({id: id});
    } catch (err) {
      throw new err
    }
  }

  static comparePassword(password, hash){
    return bcrypt.compareSync(password, hash)
  }

}
export default mongoose.model(User, schema, 'users');
