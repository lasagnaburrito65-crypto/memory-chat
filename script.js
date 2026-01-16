
const saveMemoryBtn = document.getElementById("saveMemory");
const memoryInput = document.getElementById("memoryInput");
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatInputArea = document.getElementById("chatInputArea");
const agreeCheckbox = document.getElementById("agreeDisclaimer");


let memoryText = "";
let memorySentences = [];


agreeCheckbox.addEventListener("change", () => {
  saveMemoryBtn.disabled = !agreeCheckbox.checked;
});


saveMemoryBtn.addEventListener("click", () => {
  memoryText = memoryInput.value.trim();

  if (!memoryText) {
    alert("Please paste some memories first.");
    return;
  }


  memorySentences = memoryText
    .split(/[\.\n]/)
    .map(s => s.trim())
    .filter(s => s.length > 10);

  chatBox.classList.remove("hidden");
  chatInputArea.classList.remove("hidden");

  userInput.disabled = false;
  sendBtn.disabled = false;

  chatBox.innerHTML = "";
  chatBox.innerHTML += `<div class="bot">Memory loaded 🙂 You can talk now.</div>`;
});


sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("user", text);

  setTimeout(() => {
    const reply = generateMemoryReply(text);
    appendMessage("bot", reply);
  }, 600); // typing delay

  userInput.value = "";
}


function appendMessage(sender, text) {
  chatBox.innerHTML += `<div class="${sender}">${text}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}


function generateMemoryReply(userMessage) {
  const userWords = userMessage
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 3);

  for (let sentence of memorySentences) {
    for (let word of userWords) {
      if (sentence.toLowerCase().includes(word)) {
        return sentence;
      }
    }
  }


  const fallbackReplies = [
    "I remember that feeling.",
    "That brings back memories.",
    "Yeah… those moments mattered.",
    "I’m here with you.",
    "That reminds me of something you shared earlier."
  ];

  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

