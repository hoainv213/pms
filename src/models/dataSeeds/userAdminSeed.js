import {User} from '../../models';
import bcrypt from 'bcrypt';

const userAdminSeed = async () => {
  const hash = await bcrypt.hash('123', 10);
  const userAdmin = {
    username: 'admin',
    fullname: 'pms admin',
    email: 'admin@admin.com',
    password: hash,
    type: 'admin',
  };

  try {
    const user = await User.create(userAdmin);
    console.log(`Seed user admin ${user.email} success !`)
  } catch(err) {
    console.log(err)
  }
  
};
export default userAdminSeed;