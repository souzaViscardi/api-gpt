"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gptIterationSchema = void 0;
var gptIterationSchema = exports.gptIterationSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 3
    },
    message: {
      type: 'string',
      minLength: 2
    }
  },
  required: ['email', 'message'],
  additionalProperties: false
};