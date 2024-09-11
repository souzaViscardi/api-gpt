"use strict";

require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
var _index = _interopRequireDefault(require("./database/index.js"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _index2 = _interopRequireDefault(require("./routes/index.js"));
var _Jwt = _interopRequireDefault(require("./middlewares/Jwt.js"));
var _auth = _interopRequireDefault(require("./middlewares/auth.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var APP_PORT = process.env.APP_PORT;
var PORT = APP_PORT || 3000;
(0, _index["default"])();
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use("/", _auth["default"]);
app.use("/api", _index2["default"]);
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});