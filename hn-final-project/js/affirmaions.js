//bible api
async function fetchVerse() {
    const ref = document.getElementById("verseInput").value || "John 14:6";
    try {
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(ref)}`);
      const data = await response.json();
      document.getElementById("verseDisplay").innerText = `${data.reference}: "${data.text.trim()}"`;
    } catch (error) {
      document.getElementById("verseDisplay").innerText = "Could not load verse. Check your input.";
      console.error("Bible API error:", error);
    }
  }
  
  // Automatically load a default verse on page load
  window.addEventListener("DOMContentLoaded", fetchVerse);

  const affirmations = [
    "I AM calm, centered, and grounded.",
    "I AM one with the divine source of all life.",
    "I AM the creator of my thoughts, feelings, and results.",
    "I AM worthy of love, peace, and joy.",
    "I AM becoming all I was created to be.",
    "I AM divine intelligence expressing itself.",
    "I AM aligned with purpose and destiny.",
    "I AM powerful beyond measure.",
    "I AM choosing faith over fear.",
    "I AM the living temple of the Most High."
  ];
  
  function generateAffirmation() {
    const index = Math.floor(Math.random() * affirmations.length);
    document.getElementById("affirmationText").innerText = affirmations[index];
  }
  
  window.addEventListener("DOMContentLoaded", generateAffirmation);
  
// Sample data; later to be connected to actual entries from localStorage
const emotionData = {
    labels: ["Joy", "Calm", "Love", "Fear", "Doubt", "Anger"],
    datasets: [{
      label: "Emotions Logged",
      data: [12, 9, 15, 4, 6, 2],
      backgroundColor: ["#4dc9f6", "#f67019", "#f53794", "#537bc4", "#acc236", "#166a8f"]
    }]
  };
  
  const goalData = {
    labels: ["Completed", "In Progress", "Missed"],
    datasets: [{
      label: "Goals",
      data: [10, 5, 3],
      backgroundColor: ["#00c49a", "#ffbb28", "#ff6e54"]
    }]
  };
  
  const ctx1 = document.getElementById("emotionChart").getContext("2d");
  new Chart(ctx1, {
    type: 'bar',
    data: emotionData,
    options: {
      responsive: true,
      plugins: { title: { display: true, text: 'Emotional Awareness Tracker' } }
    }
  });
  
  const ctx2 = document.getElementById("goalChart").getContext("2d");
  new Chart(ctx2, {
    type: 'doughnut',
    data: goalData,
    options: {
      responsive: true,
      plugins: { title: { display: true, text: 'Goal Tracking Overview' } }
    }
  });
  
  

