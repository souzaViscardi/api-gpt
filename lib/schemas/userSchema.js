"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var userSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3
    },
    email: {
      type: 'string',
      format: 'email'
    },
    phone: {
      type: 'string',
      pattern: '^[0-9]{10,13}$'
    }
  },
  required: ['name', 'email', 'phone'],
  additionalProperties: false
};
var _default = exports["default"] = userSchema;