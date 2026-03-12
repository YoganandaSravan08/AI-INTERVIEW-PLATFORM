const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


// Analyze Resume
async function analyzeResume(text) {

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
Analyze this resume and return ONLY valid JSON.

Format:

{
 "skills": [],
 "technologies": [],
 "experience_summary": "",
 "improvement_suggestions": []
}

Resume:
${text}
`
      }
    ],
    model: "llama-3.1-8b-instant"
  });

  return response.choices[0].message.content;
}



// Generate Multiple Interview Questions
async function generateInterviewQuestions(text) {

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
Based on this resume generate 5 technical interview questions.

Resume:
${text}
`
      }
    ],
    model: "llama-3.1-8b-instant"
  });

  return response.choices[0].message.content;
}



// Generate Single Interview Question
async function generateInterviewQuestion(text) {

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
You are a technical interviewer.

Based on this resume generate ONE technical interview question.

Resume:
${text}
`
      }
    ],
    model: "llama-3.1-8b-instant"
  });

  return response.choices[0].message.content;
}


module.exports = {
  analyzeResume,
  generateInterviewQuestions,
  generateInterviewQuestion
};