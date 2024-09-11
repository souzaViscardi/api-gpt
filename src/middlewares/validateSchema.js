import Ajv from 'ajv'
import addFormats from "ajv-formats"

let ajv = new Ajv({ allErrors:true, removeAdditional:'all' })
addFormats(ajv)

import userSchema from '../schemas/userSchema.js'
import { gptIterationSchema } from '../schemas/gptSchema.js'
ajv.addSchema(userSchema, 'new-user')
ajv.addSchema(gptIterationSchema, 'gpt-iteration')

/**
 * Format error responses
 * @param  {Object} schemaErrors - array of json-schema errors, describing each validation failure
 * @return {String} formatted api response
 */
function errorResponse(schemaErrors) {
  let errors = schemaErrors.map((error) => {
    return {
      path: error.dataPath,
      message: error.message
    }
  })
  return {
    status: 'failed',
    errors: errors
  }
}

/**
 * Validates incoming request bodies against the given schema,
 * providing an error response when validation fails
 * @param  {String} schemaName - name of the schema to validate
 * @return {Object} response
 */
export const validateSchema = (schemaName) => {
  return (req, res, next) => {
    let valid = ajv.validate(schemaName, req.body)
    if (!valid) {
      return res.send(errorResponse(ajv.errors))
    }
    next()
  }
}