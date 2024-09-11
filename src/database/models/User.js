import mongoose from 'mongoose';
import GptIterationsSchema from './GptIterations';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone:{ type: String, required: true },
  gptIteration: [GptIterationsSchema]
});

const User = mongoose.model('users', userSchema);

export default User;