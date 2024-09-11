const mongoose = require('mongoose');

const GptIterationsSchema = new mongoose.Schema({
  userQuestion: { type: String },
  gtpResponse: { type: String },
});

export default GptIterationsSchema;