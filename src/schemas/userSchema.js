const userSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    phone: { type: 'string', pattern: '^[0-9]{10,13}$' }
  },
  required: ['name', 'email', 'phone'],
  additionalProperties: false
};

export default userSchema;