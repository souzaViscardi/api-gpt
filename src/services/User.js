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
    async  saveGptIteration({email, ask, resposnse}) {
      try {
        const filtro = {email};
        const gptIteration = { 
          userQuestion: ask,
          gtpResponse: resposnse
      };
        return await User.updateOne(filtro, { $push: { gptIteration: gptIteration } });
      } catch (error) {
        throw new Error(`Error in update user by email: ${error.message}`);
      }
    }
}
  

