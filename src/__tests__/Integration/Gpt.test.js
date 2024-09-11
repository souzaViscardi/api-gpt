import GptService from '../../services/Gpt';
import OpenAI from 'openai';
import UserService from '../../services/User';

jest.mock('../../services/User');
jest.mock("openai")
const mockSaveGptIteration = jest.fn();

const MockUserService = jest.fn(() => ({
  saveGptIteration: mockSaveGptIteration
}));

describe('GptService', () => {
  let gptService;
  let openAiMock;

  beforeEach(() => {
    gptService = new GptService();
    openAiMock = OpenAI.mock.instances[0];
    openAiMock.chat = {
      completions: {
        create: jest.fn()
      }
    };
    UserService.mockImplementation(MockUserService);
  });
  afterEach(async () => {
    jest.resetAllMocks();
  });
  it('should return content from OpenAI and save user data', async () => {

    openAiMock.chat.completions.create.mockResolvedValue({
      choices: [{ message: { content: 'response' } }]
    });

    mockSaveGptIteration.mockResolvedValue();

    const user = {
      email: 'test@example.com',
      message: 'ola'
    };

    const response = await gptService.simpleAsk(user);

    expect(response).toBe('response');

    expect(mockSaveGptIteration).toHaveBeenCalledWith({
      email: 'test@example.com',
      ask: 'ola',
      resposnse: 'response'
    });
  });

  it('should throw an error if OpenAI API fails', async () => {
    openAiMock.chat.completions.create.mockRejectedValue(new Error('OpenAI API Error'));

    const user = {
      email: 'test@example.com',
      message: 'ola'
    };

    await expect(gptService.simpleAsk(user)).rejects.toThrow('Error in simpleAsk: OpenAI API Error');

    expect(mockSaveGptIteration).not.toHaveBeenCalled();
  });
});
