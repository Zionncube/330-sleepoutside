export function startSpeechToText(outputElementId) {
  const output = document.getElementById(outputElementId);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    output.value = transcript;
  };

  recognition.onerror = (event) => {
    alert("Speech recognition error: " + event.error);
  };

  recognition.start();
}