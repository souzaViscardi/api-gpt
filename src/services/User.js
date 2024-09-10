import User from '../database/models/User.js';


export default class UserService {

 async createUser(userData) {
      try {
        const user = new User(userData);
        if(await this.userExist(userData.email)){
          return "User already registered"
        }
        const savedUser = await user.save();
        return savedUser;
      } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    }
    async userExist(email) {
      try {
        const user = await User.findOne({ email });
        if(!user)
          return false;
        return true
      } catch (error) {
        throw new Error(`Error finding user by email: ${error.message}`);
      }
    }
     async findUserById(userId) {
      try {
        const user = await User.find(userId);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error(`Error finding user: ${error.message}`);
      }
    }
  
     async listUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(`Error listing users: ${error.message}`);
      }
    }
  }
  

