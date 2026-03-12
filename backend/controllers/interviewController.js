const Groq = require("groq-sdk");
const { generateInterviewQuestion } = require("../services/aiService");
const Interview = require("../models/Interview");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


// Generate AI question
exports.generateQuestion = async (req, res) => {
  try {

    const { resumeText } = req.body;

    const question = await generateInterviewQuestion(resumeText);

    res.json({ question });

  } catch (error) {

    res.status(500).json({
      message: "Error generating question",
      error: error.message
    });

  }
};



// Evaluate answer
exports.evaluateAnswer = async (req, res) => {

  try {

    const { question, answer, userId } = req.body;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
Evaluate the following interview answer.

Question:
${question}

Answer:
${answer}

Give:
Score out of 10
Strengths
Weaknesses
Improvement suggestions
`
        }
      ],
      model: "llama-3.1-8b-instant"
    });

    const feedback = response.choices[0].message.content;

    const scoreMatch = feedback.match(/\d+/);
    const score = scoreMatch ? parseInt(scoreMatch[0]) : null;

    const interview = new Interview({
      userId,
      question,
      answer,
      feedback,
      score
    });

    await interview.save();

    res.json({
      feedback,
      score
    });

  } catch (error) {

    res.status(500).json({
      message: "Error evaluating answer",
      error: error.message
    });

  }

};



// Get interview history
exports.getInterviewHistory = async (req, res) => {

  try {

    const { userId } = req.params;

    const history = await Interview.find({ userId }).sort({ createdAt: -1 });

    res.json(history);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching history",
      error: error.message
    });

  }

};