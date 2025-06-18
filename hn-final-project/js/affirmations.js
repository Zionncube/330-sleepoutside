// js/affirmations.js
const affirmations = [
  "I AM strong, calm, and aligned with divine purpose.",
  "I AM light, love, and power in motion.",
  "I AM the master of my thoughts and creator of my life.",
  "I AM becoming all I was created to be.",
  "I AM peace in the storm, clarity in the confusion."
];

function generateAffirmation() {
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  document.getElementById('affirmationText').textContent = affirmations[randomIndex];
}

document.addEventListener('DOMContentLoaded', () => {
  generateAffirmation();
});

// js/bible.js (using ESV Bible API as an example — you'll need a real API key)
const BIBLE_API_KEY = 'YOUR_ESV_API_KEY';
const BIBLE_API_URL = 'https://api.esv.org/v3/passage/text/?q=John+14:27';

async function fetchScripture(passage = 'John 14:27') {
  try {
    const response = await fetch(`https://api.esv.org/v3/passage/text/?q=${encodeURIComponent(passage)}`, {
      headers: {
        'Authorization': `Token ${BIBLE_API_KEY}`
      }
    });
    const data = await response.json();
    const scriptureText = data.passages ? data.passages[0].trim() : 'Scripture not available';

    const scriptureSection = document.createElement('section');
    scriptureSection.classList.add('section');
    scriptureSection.innerHTML = `
      <h2>📖 Daily Scripture</h2>
      <p>${scriptureText}</p>
    `;

    document.querySelector('main').appendChild(scriptureSection);
  } catch (error) {
    console.error('Error fetching scripture:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchScripture();
});
