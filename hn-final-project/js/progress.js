// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Load journal entries from localStorage
const entries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
const totalEntries = entries.length;
document.getElementById("total-entries").textContent = totalEntries;

if (entries.length > 0) {
  const latest = entries[entries.length - 1];
  document.getElementById("last-entry").textContent = latest.date;
} else {
  document.getElementById("last-entry").textContent = "No entries yet.";
}

// Random affirmation
const affirmations = [
  "I am becoming all I was designed to be.",
  "My inner world creates my outer world.",
  "Each thought is a seed of power.",
  "I am in control of my mind and emotions.",
  "My calm is my strength.",
  "I am the author of my becoming."
];
const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
document.getElementById("affirmation").textContent = `“${randomAffirmation}”`;

// Build activity calendar
const calendar = document.getElementById("calendar-grid");
const dateMap = {};

// Count entries by date
entries.forEach(entry => {
  const dateKey = new Date(entry.date).toDateString();
  dateMap[dateKey] = (dateMap[dateKey] || 0) + 1;
});

// Show last 30 days
const today = new Date();
for (let i = 29; i >= 0; i--) {
  const date = new Date(today);
  date.setDate(today.getDate() - i);
  const dateStr = date.toDateString();
  const entryCount = dateMap[dateStr] || 0;

  const box = document.createElement("div");
  box.className = "calendar-day";
  box.title = dateStr;
  box.setAttribute("data-day", date.getDate());
  box.style.backgroundColor = entryCount > 0
    ? `rgba(108, 99, 255, ${Math.min(entryCount, 4) / 4})`
    : "#eee";

  calendar.appendChild(box);
}


// === Journal vs Affirmations (7-Day Line Chart) ===
const ctxComparison = document.getElementById('comparisonChart').getContext('2d');

const journalCounts = [];
const affirmationCounts = [];

last7Days.forEach(date => {
  const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const journalData = JSON.parse(localStorage.getItem('journal_entries') || '[]');
  const affirmData = JSON.parse(localStorage.getItem('affirmations') || '[]');

  const journalCount = journalData.filter(entry => entry.dateSaved && entry.dateSaved.startsWith(dateStr)).length;
  const affirmCount = affirmData.filter(entry => entry.dateSaved && entry.dateSaved.startsWith(dateStr)).length;

  journalCounts.push(journalCount);
  affirmationCounts.push(affirmCount);
});

new Chart(ctxComparison, {
  type: 'line',
  data: {
    labels: weeklyLabels,
    datasets: [
      {
        label: 'Journal Entries',
        data: journalCounts,
        borderColor: '#4B0082',
        backgroundColor: '#4B0082',
        tension: 0.3
      },
      {
        label: 'Affirmations',
        data: affirmationCounts,
        borderColor: '#20B2AA',
        backgroundColor: '#20B2AA',
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  }
});
