//dictation

function startDictation() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const journalBox = document.getElementById("journalInput");
      journalBox.value += (journalBox.value ? "\n" : "") + transcript;
    };
  
    recognition.onerror = (event) => {
      alert("Speech recognition error: " + event.error);
    };
  
    recognition.start();
  }
  