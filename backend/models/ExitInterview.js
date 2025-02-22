const mongoose = require('mongoose');

const exitInterviewSchema = new mongoose.Schema({
  resignation: { type: mongoose.Schema.Types.ObjectId, ref: 'Resignation', required: true },
  answers: { type: mongoose.Schema.Types.Mixed, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExitInterview', exitInterviewSchema);