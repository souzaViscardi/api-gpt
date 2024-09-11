"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _User = _interopRequireDefault(require("./User.js"));
var _Gpt = _interopRequireDefault(require("./Gpt.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.use("/user", _User["default"]);
router.use("/gpt", _Gpt["default"]);
var _default = exports["default"] = router;