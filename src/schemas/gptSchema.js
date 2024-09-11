export const gptIterationSchema = {
    type: 'object',
    properties: {
      email: { type: 'string',format: 'email', minLength: 3 },
      message: { type: 'string', minLength: 2 },
    },
    required: ['email', 'message',],
    additionalProperties: false
  };
  
