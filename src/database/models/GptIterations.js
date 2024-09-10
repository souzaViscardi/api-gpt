const mongoose = require('mongoose');

const GptIterationsSchema = new mongoose.Schema({
  userQuestion: { type: String, required: true },
  gtpResponse: { type: String, required: true },
});

export default GptIterationsSchema;