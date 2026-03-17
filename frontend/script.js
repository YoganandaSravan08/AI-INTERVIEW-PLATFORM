const API_URL = "https://ai-interview-platform-5tom.onrender.com";


async function apiRequest(endpoint, method="GET", body=null){

try{

const options = {
method,
headers:{
"Content-Type":"application/json"
}
};

if(body){
options.body = JSON.stringify(body);
}

const res = await fetch(`${API_URL}${endpoint}`, options);

if(!res.ok){
throw new Error("API request failed");
}

return await res.json();

}catch(err){

console.error("API Error:", err);

alert("Something went wrong. Please try again.");

}

}

function checkAuth(){
  const token = localStorage.getItem("token");
  if(!token){
    window.location.href = "login.html";
  }
}

/* =============================
   SIGNUP
============================= */
async function signup() {

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try {

const response = await fetch(`${API_URL}/api/auth/signup`, {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
name,
email,
password
})

});

const data = await response.json();

if(response.ok){

alert("Signup successful!");

window.location.href = "verify.html.html";

}else{

alert(data.message || "Signup failed");

}

}
catch(error){

alert("Something went wrong. Please try again.");

}

}


/* =============================
   LOGIN
============================= */
async function login(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){
    alert("Please enter valid email address");
    return;
}

try{

const response = await fetch(`${API_URL}/api/auth/login`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
email,
password
})

});

const data = await response.json();

if(response.ok){

localStorage.setItem("token",data.token);
localStorage.setItem("userId",data.userId);   // ⭐ IMPORTANT

alert("Login successful!");

window.location.href = "dashboard.html";

}else{

alert(data.message || "Login failed");

}

}
catch(error){

alert("Something went wrong. Please try again.");

}

}

/* =============================
   RESUME UPLOAD + AI ANALYSIS
============================= */

async function uploadResume(){

const file = document.getElementById("resume").files[0];

if(!file){

alert("Please upload resume");

return;

}

const formData = new FormData();

formData.append("resume",file);

try{

const res = await fetch(`${API_URL}/api/upload-resume`,{

method:"POST",

body:formData

});

const data = await res.json();

let analysis = data.analysis;

if (typeof analysis === "string") {
    analysis = JSON.parse(analysis);
}

document.getElementById("analysis").innerText =
JSON.stringify(analysis, null, 2);

localStorage.setItem("questions",data.interviewQuestions);

alert("Resume analyzed successfully");

}catch(err){

alert("Resume analysis failed");

}

}


/* =============================
   LOAD INTERVIEW QUESTION
============================= */

function loadQuestion(){

const question = localStorage.getItem("questions");

if(!question){

document.getElementById("question").innerText =
"No questions generated yet. Please analyze resume.";

return;

}

document.getElementById("question").innerText = question;

}


/* =============================
   SUBMIT ANSWER
============================= */

async function submitAnswer(){

const question = document.getElementById("question").innerText;

const answer = document.getElementById("answer").value;

const userId = localStorage.getItem("userId");

if(!answer){

alert("Please write an answer");

return;

}

try{

const res = await fetch(`${API_URL}/api/interview/evaluate-answer`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
userId,
question,
answer
})

});

const data = await res.json();

document.getElementById("feedback").innerText = data.feedback;

}catch(err){

alert("Answer evaluation failed");

}

}


/* =============================
   LOAD INTERVIEW HISTORY
============================= */

async function loadHistory(){

const userId = localStorage.getItem("userId");

const data = await apiRequest(`/api/interview/history/${userId}`);

if(!data) return;

let html="";

data.forEach(item=>{

html+=`
<div class="bg-gray-800 p-4 rounded mb-4">

<h4 class="font-bold">Question</h4>
<p>${item.question}</p>

<h4 class="font-bold mt-2">Score</h4>
<p>${item.score}</p>

</div>
`;

});

document.getElementById("history").innerHTML = html;

}


/* =============================
   DASHBOARD ANALYTICS
============================= */

async function loadDashboard(){

const userId = localStorage.getItem("userId");

try{

const res = await fetch(`${API_URL}/api/interview/history/${userId}`);

const data = await res.json();

document.getElementById("totalInterviews").innerText = data.length;

let scores = data.map(i=>i.score || 0);

let avg = scores.reduce((a,b)=>a+b,0)/scores.length || 0;

document.getElementById("avgScore").innerText = avg.toFixed(1);

document.getElementById("bestScore").innerText = Math.max(...scores);

const ctx = document.getElementById("scoreChart");

new Chart(ctx,{
type:"line",
data:{
labels:scores.map((_,i)=>`Interview ${i+1}`),
datasets:[{
label:"Score",
data:scores,
borderColor:"rgb(59,130,246)",
tension:0.3
}]
}
});

}catch(err){

console.log("Dashboard error");

}

}


/* =============================
   LOGOUT
============================= */

function logout(){

localStorage.removeItem("token");
localStorage.removeItem("userId");
localStorage.removeItem("questions");

window.location.href="login.html";

}
async function verifyOTP(){

const email = document.getElementById("email").value;
const otp = document.getElementById("otp").value;

try{

const response = await fetch(`${API_URL}/api/auth/verify-otp`,{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
otp
})

});

const data = await response.json();

if(response.ok){

alert("Email verified successfully!");
window.location.href="login.html";

}else{

alert(data.message);

}

}catch(error){

alert("Verification failed");

}

}
