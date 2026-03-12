const fs = require("fs");
const pdfParse = require("pdf-parse");
const { analyzeResume, generateInterviewQuestions } = require("../services/aiService");

exports.uploadResume = async (req, res) => {

  try {

    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdfParse(dataBuffer);

    const resumeText = data.text;

    const analysisRaw = await analyzeResume(resumeText);

    let analysis;

    try {
    analysis = JSON.parse(analysisRaw);
    } catch {
    analysis = analysisRaw;
}

    const questions = await generateInterviewQuestions(resumeText);

    res.json({
      message: "Resume analyzed successfully",
      analysis,
      interviewQuestions: questions
    });

  } catch (error) {

    res.status(500).json({
      message: "Error analyzing resume",
      error: error.message
    });

  }

};