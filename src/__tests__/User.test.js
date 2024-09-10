import UserService from '../services/User'; 
import User from '../database/models/User.js';
jest.mock('mongoose');
const mockSave = jest.fn();
const mockFindById = jest.fn();
const mockFind = jest.fn();

jest.mock('../database/models/User.js', () => {

  return jest.fn().mockImplementation(() => ({
    findById: mockFindById,
    find: mockFind,
    save: mockSave,
  }));
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
    const userData = { id:"2132198390128312", name: 'John Deer', email: 'john.deer@example.com', phone: '123-456-7890' };
    let user = new User()
    user.save.mockResolvedValue(userData);
    const result = await userService.createUser(userData);
    expect(user.save).toHaveBeenCalled();
    expect(result).toEqual(userData);
  });

  test('should handle error when creating a user', async () => {
    const userData = { id:"2132198390128312", name: 'John Deer', email: 'john.deer@example.com', phone: '123-456-7890' };

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
