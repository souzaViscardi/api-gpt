"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var mongoose = require('mongoose');
var GptIterationsSchema = new mongoose.Schema({
  userQuestion: {
    type: String
  },
  gtpResponse: {
    type: String
  }
});
var _default = exports["default"] = GptIterationsSchema;