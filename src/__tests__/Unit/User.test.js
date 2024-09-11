import UserService from '../../services/User.js'; 
import User from '../../database/models/User.js';
jest.mock('mongoose');

jest.mock('../../database/models/User', () => {
  const mockSave = jest.fn();
  const mockFindById = jest.fn();
  const mockFindOne = jest.fn();
  const mockFind = jest.fn();

  const User = jest.fn().mockImplementation(() => ({
    save: mockSave,
  }));

  User.findById = mockFindById;
  User.findOne = mockFindOne;
  User.find = mockFind;
  User.prototype.save = mockSave
  return User;
});

describe('UserService', () => {
  let userService;
  
  beforeAll(() => {
    userService = new UserService();
    
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create a user', async () => {
    const userData = { id:"2132198390128312", name: 'John Deer', email: 'john.deer@example.com', phone: '1234567890' };
    let email = null
    User.prototype.save.mockResolvedValue(userData)
    User.findOne.mockResolvedValue(email);

    const result = await userService.createUser(userData);
    expect(User.prototype.save).toHaveBeenCalled();
    expect(result).toEqual(userData);
  });
  
  test('should verify if user exist', async () => {
    const userData = { id:"2132198390128312", name: 'John Deer', email: 'john.deer@example.com', phone: '1234567890' };

    let email = true
    User.findOne.mockResolvedValue(email);

    const result = await userService.createUser(userData);
    expect(result).toEqual("User already registered");
  });

  test('should handle error when creating a user', async () => {
    const userData = { id:"2132198390128312", name: 'John Deer', email: 'john.deer@example.com', phone: '1234567890' };

    const errorMessage = 'Failed to save user';
    let user = new User()

    user.save.mockRejectedValue(new Error(errorMessage));
    try {
      await userService.createUser(userData);
    } catch (error) {
      expect(error.message).toBe(`Error creating user: ${errorMessage}`);
    }
  });
});
