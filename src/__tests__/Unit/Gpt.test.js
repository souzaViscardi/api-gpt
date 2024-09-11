import UserService from '../../services/User';
import GptService from '../../services/Gpt';
describe('simpleAsk', () => {
    let gptService;
    let mockOpenAiChatCompletion;
    let mockSaveGptIteration;

    beforeEach(() => {
        gptService = new GptService();
        mockOpenAiChatCompletion = jest.fn().mockResolvedValue({
            choices: [
                {
                    message: {
                        content: 'Olá teste concluido'
                    }
                }
            ]
        });

        gptService.openAi = {
            chat: {
                completions: {
                    create: mockOpenAiChatCompletion
                }
            }
        };

        mockSaveGptIteration = jest.fn().mockResolvedValue();
        jest.spyOn(UserService.prototype, 'saveGptIteration').mockImplementation(mockSaveGptIteration);
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('Deve retornar o conteúdo gerado pela OpenAI e salvar a iteração', async () => {
        const mockUser = { email: 'viscardi.souza@gmail.com', message: 'teste message' };

        const response = await gptService.simpleAsk(mockUser);

        expect(mockOpenAiChatCompletion).toHaveBeenCalledWith({
            messages: [{ role: 'user', content: mockUser.message }],
            model: 'gpt-4o-mini',
            max_tokens: 450
        });

        expect(mockSaveGptIteration).toHaveBeenCalledWith({
            email: mockUser.email,
            ask: mockUser.message,
            resposnse: 'Olá teste concluido'
        });

        expect(response).toBe('Olá teste concluido');
    });
    it('Deve lidar com o erro da API corretamente', async () => {
        mockOpenAiChatCompletion.mockRejectedValue(new Error('API Error'));

        const mockUser = { email: 'viscardi.souza@gmail.com', message: 'teste message' };
        try {
             await gptService.simpleAsk(mockUser);

        } catch (error) {
            expect(error.message).toBe("Error in simpleAsk: API Error");

        }
    });
    it('Deve lidar com o erro da ao atualizar db corretamente', async () => {
        mockSaveGptIteration.mockRejectedValue(new Error('DB Error'));

        const mockUser = { email: 'viscardi.souza@gmail.com', message: 'teste message' };
        try {
             await gptService.simpleAsk(mockUser);

        } catch (error) {
            expect(error.message).toBe("Error in simpleAsk: DB Error");

        }

    });
});