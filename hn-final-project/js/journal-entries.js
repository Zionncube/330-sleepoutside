const recognition = new webkitSpeechRecognition(); // Or SpeechRecognition
recognition.continuous = false;
recognition.lang = "en-US";

function startDictation() {
  recognition.start();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("journalInput").value += transcript;
  };
}

  