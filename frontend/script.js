const submitBtn = document.getElementById("submitBtn");
const promptBox = document.getElementById("prompt");
const voiceBtn = document.getElementById("voiceBtn");

// Voice Input
voiceBtn.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    promptBox.value = event.results[0][0].transcript;
  };
});

// Submit Prompt
submitBtn.addEventListener("click", async () => {
  const prompt = promptBox.value.trim();
  if (!prompt) return alert("Please enter your mood.");

  localStorage.setItem("userPrompt", prompt);
  window.location.href = "results.html";
});

// On Results Page
if (window.location.pathname.includes("results.html")) {
  const output = document.getElementById("output");
  const prompt = localStorage.getItem("userPrompt");

  fetch("http://localhost:3000/api/mood", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  })
  .then(res => res.json())
  .then(data => output.textContent = data.recommendations)
  .catch(err => output.textContent = "Error fetching recommendations.");
}
