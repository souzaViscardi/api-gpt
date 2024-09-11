"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Jwt = _interopRequireDefault(require("./Jwt"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = function _default(req, res, next) {
  return _Jwt["default"].verifyJWT(req, res, next);
};