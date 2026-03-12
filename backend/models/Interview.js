const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  question: {
    type: String,
    required: true
  },

  answer: {
    type: String,
    required: true
  },

  feedback: {
    type: String
  },

  score: {
    type: Number
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Interview", interviewSchema);