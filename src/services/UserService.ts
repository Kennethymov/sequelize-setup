import User from "../database/models/User";
import IUser from "../interface/IUser";

class UserService {

    public async  getAll(): Promise<IUser[] | null> {
      const users = await User.findAll({
        attributes: { exclude: ['password', 'role'] },
      });
      return users;
    }
  
    public async create(user: IUser): Promise<IUser | null> {
      const { email, password, name, role } = user;
  
  
      const newUser = await User.create({ email, password, name, role});
  
      return newUser;
      }
  
 
  }
  
  export default UserService;
  