const express = require("express");
const router = express.Router();

const {
  generateQuestion,
  evaluateAnswer,
  getInterviewHistory
} = require("../controllers/interviewController");

router.post("/generate-question", generateQuestion);
router.post("/evaluate-answer", evaluateAnswer);
router.get("/history/:userId", getInterviewHistory);

module.exports = router;