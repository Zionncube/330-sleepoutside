// speech.js
function startDictation() {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
      const result = event.results[0][0].transcript;
      document.getElementById('journalInput').value += result + '\n';
    };

    recognition.onerror = function(event) {
      alert('Speech recognition error: ' + event.error);
    };

    recognition.start();
  } else {
    alert('Your browser does not support speech recognition.');
  }
}

// ========== Utility: Update Footer Year ==========
document.getElementById('year').textContent = new Date().getFullYear();

// ========== Daily Verse Fetch ==========
async function fetchVerse() {
  const input = document.getElementById("verseInput").value || "Romans 8:28";
  const url = `https://bible-api.com/${encodeURIComponent(input)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.text) {
      document.getElementById("verseDisplay").textContent = `"${data.text.trim()}" — ${data.reference}`;
    } else {
      document.getElementById("verseDisplay").textContent = "Verse not found. Please try again.";
    }
  } catch (error) {
    document.getElementById("verseDisplay").textContent = "Error fetching verse.";
    console.error("Bible API error:", error);
  }
}

// ========== Voice-to-Text Journaling ==========
function startDictation() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech recognition not supported in this browser.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("journalInput").value += transcript + " ";
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  recognition.start();
}

// ========== Journal Entry Handling ==========
const journalInput = document.getElementById("journalInput");
const journalListContainer = document.createElement("section");
journalListContainer.classList.add("journal-history");
journalListContainer.innerHTML = `
  <h2>📝 Previous Entries</h2>
  <ul id="journalList"></ul>
`;
document.querySelector("main").appendChild(journalListContainer);

function loadJournalEntries() {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  const journalList = document.getElementById("journalList");
  journalList.innerHTML = "";

  entries.reverse().forEach(entry => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${entry.date}</strong><p>${entry.text}</p>`;
    journalList.appendChild(li);
  });
}

function saveJournalEntry() {
  const text = journalInput.value.trim();
  if (!text) {
    alert("Please write something before saving.");
    return;
  }

  const entry = {
    date: new Date().toLocaleString(),
    text
  };

  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.push(entry);
  localStorage.setItem("journalEntries", JSON.stringify(entries));

  journalInput.value = "";
  loadJournalEntries();
}

// ========== Save Button ==========
const saveButton = document.createElement("button");
saveButton.textContent = "💾 Save Entry";
saveButton.addEventListener("click", saveJournalEntry);
journalInput.insertAdjacentElement("afterend", saveButton);

// ========== Initialize ==========
window.addEventListener("DOMContentLoaded", () => {
  fetchVerse();
  loadJournalEntries();
});
