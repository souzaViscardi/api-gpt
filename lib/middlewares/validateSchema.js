"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSchema = void 0;
var _ajv = _interopRequireDefault(require("ajv"));
var _ajvFormats = _interopRequireDefault(require("ajv-formats"));
var _userSchema = _interopRequireDefault(require("../schemas/userSchema.js"));
var _gptSchema = require("../schemas/gptSchema.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ajv = new _ajv["default"]({
  allErrors: true,
  removeAdditional: 'all'
});
(0, _ajvFormats["default"])(ajv);
ajv.addSchema(_userSchema["default"], 'new-user');
ajv.addSchema(_gptSchema.gptIterationSchema, 'gpt-iteration');

/**
 * Format error responses
 * @param  {Object} schemaErrors - array of json-schema errors, describing each validation failure
 * @return {String} formatted api response
 */
function errorResponse(schemaErrors) {
  var errors = schemaErrors.map(function (error) {
    return {
      path: error.dataPath,
      message: error.message
    };
  });
  return {
    status: 'failed',
    errors: errors
  };
}

/**
 * Validates incoming request bodies against the given schema,
 * providing an error response when validation fails
 * @param  {String} schemaName - name of the schema to validate
 * @return {Object} response
 */
var validateSchema = exports.validateSchema = function validateSchema(schemaName) {
  return function (req, res, next) {
    var valid = ajv.validate(schemaName, req.body);
    if (!valid) {
      return res.send(errorResponse(ajv.errors));
    }
    next();
  };
};