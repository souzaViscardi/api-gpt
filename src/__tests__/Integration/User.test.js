import mongoose from 'mongoose';
import User from '../../database/models/User.js';
import UserService from '../../services/User.js';

describe('UserService Integration Tests', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  afterEach(async () => {
    await User.deleteMany({});
    jest.restoreAllMocks();
  });

  test('should create a user successfully', async () => {
    const userData = { email: 'test@gmail.com', name: 'test', phone:"55999870989" };

    const result = await userService.createUser(userData);

    expect(result).toHaveProperty('_id');
    expect(result.email).toBe(userData.email);
  });

  test('should return "User already registered" if user already exists', async () => {
    const userData = { email: 'test@gmail.com', name: 'test', phone:"55999870989" };

    await userService.createUser(userData);
    const result = await userService.createUser(userData);

    expect(result).toBe('User already registered');
  });

  test('should save GPT iteration to user document', async () => {
    const userData = { email: 'test@gmail.com', name: 'test', phone:"55999870989" };
    const user = await userService.createUser(userData);

    const gptData = {
      email: user.email,
      ask: 'What is Shrek?',
      resposnse: 'Shrek is an animated movie...'
    };

    await userService.saveGptIteration(gptData);

    const updatedUser = await User.findById(user._id);
    expect(updatedUser.gptIteration).toHaveLength(1);
    expect(updatedUser.gptIteration[0]).toMatchObject({
      userQuestion: gptData.ask,
      gtpResponse: gptData.resposnse
    });
  });

  test('should handle errors when creating a user', async () => {
    const userData = { email: 'invalid-email', name: 'test', phone: "55999870989" };

    jest.spyOn(User.prototype, 'save').mockRejectedValue(new Error('Save error'));

    await expect(userService.createUser(userData)).rejects.toThrow('Error creating user: Save error');
  });

  test('should handle errors when finding a user by email', async () => {
    jest.spyOn(User, 'findOne').mockRejectedValue(new Error('Find error'));

    await expect(userService.userExist('test@gmail.com')).rejects.toThrow('Error finding user by email: Find error');
  });

  test('should handle errors when saving GPT iteration', async () => {
    const userData = { email: 'test@gmail.com', name: 'test', phone: "55999870989" };
    const user = await userService.createUser(userData);
    jest.spyOn(User, 'findOne').mockResolvedValue(false);

    const gptData = {
      email: user.email,
      ask: 'What is Shrek?',
      resposnse: 'Shrek is an animated movie...'
    };

    jest.spyOn(User, 'updateOne').mockRejectedValue(new Error('Update error'));

    await expect(userService.saveGptIteration(gptData)).rejects.toThrow('Error in update user by email: Update error');
  });
});
