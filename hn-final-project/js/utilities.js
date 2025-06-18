//helper function (get or fetch)
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
  
  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
//journal unctions e.g
//[
   // {
   //     id: "entry-001",
    //    date: "2025-05-28",
     //   title: "Awakening",
    //    content: "Today I realized my calmness influences my world...",
     //   tags: ["spiritual", "realization"]
     // },
     // ...
  //]
function addJournalEntry(entry) {
    const entries = getData("journalEntries");
    entry.id = `entry-${Date.now()}`;
    entries.push(entry);
    saveData("journalEntries", entries);
  }
  
  function getAllJournalEntries() {
    return getData("journalEntries");
  }
  
  function deleteJournalEntry(id) {
    const entries = getData("journalEntries").filter(entry => entry.id !== id);
    saveData("journalEntries", entries);
  }

//goals functions e.g
//[
 //   {
 //       id: "goal-001",
 //       title: "Wake at 5AM daily",
 //       category: "physical",
 //       deadline: "2025-06-15",
  //      completed: false,
   //     notes: "Track using calendar"
  //    },
   //   ...
  //]
    
function addGoal(goal) {
    const goals = getData("goals");
    goal.id = `goal-${Date.now()}`;
    goal.completed = false;
    goals.push(goal);
    saveData("goals", goals);
  }
  
  function markGoalAsCompleted(id) {
    const goals = getData("goals").map(goal => {
      if (goal.id === id) goal.completed = true;
      return goal;
    });
    saveData("goals", goals);
  }
  
  function getIncompleteGoals() {
    return getData("goals").filter(goal => !goal.completed);
  }

// progress log functions e.g
//[
   // {
     //   id: "log-001",
     //   date: "2025-05-27",
     //   description: "Journaled for 15 minutes and drank 2L of water",
     //   reflection: "Felt very centered afterward."
     // },
     // ...
   // ]
    
function addProgressLog(log) {
    const logs = getData("progressLog");
    log.id = `log-${Date.now()}`;
    logs.push(log);
    saveData("progressLog", logs);
  }
  
  function getAllProgressLogs() {
    return getData("progressLog");
  }

  // schedule functions e.g
  //[
    //{
      //  id: "task-001",
       // date: "2025-06-01",
       // time: "07:30",
       // title: "Meditation & Bible Reading",
       // duration: "30 mins",
       // repeat: "daily"
     // },
     // ...
    //]
    
  function addScheduleTask(task) {
    const tasks = getData("schedule");
    task.id = `task-${Date.now()}`;
    tasks.push(task);
    saveData("schedule", tasks);
  }
  
  function getTodaySchedule() {
    const today = new Date().toISOString().split("T")[0];
    return getData("schedule").filter(task => task.date === today);
  }

// ffirmatins functions e.g
//[
 //   {
  //      id: "aff-001",
   //     text: "I AM calm. I AM focused. I AM becoming who I choose to be.",
   //     tags: ["calm", "identity"]
   //   },
   //   ...
    //]
    
function addAffirmation(text, tags = []) {
    const affirmations = getData("affirmations");
    affirmations.push({
      id: `aff-${Date.now()}`,
      text,
      tags
    });
    saveData("affirmations", affirmations);
  }
  
  function getAllAffirmations() {
    return getData("affirmations");
  }

  document.getElementById("taskForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("taskTitle").value;
    const date = document.getElementById("taskDate").value;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ title, date });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.reset();
    loadTodayTasks();
  });
  
  function loadTodayTasks() {
    const today = new Date().toISOString().split("T")[0];
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const todayTasks = tasks.filter(task => task.date === today);
    const list = document.getElementById("todayTasks");
    list.innerHTML = "";
    todayTasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.title;
      list.appendChild(li);
    });
  }
  
  // Load tasks on page load
  window.addEventListener("DOMContentLoaded", loadTodayTasks);

// utilities.js
async function fetchVerse() {
  const verseDisplay = document.getElementById('verseDisplay');
  const input = document.getElementById('verseInput').value.trim();
  let reference = input || 'Romans 8:28'; // Default verse

  try {
    const response = await fetch(`https://bible-api.com/${encodeURIComponent(reference)}`);
    if (!response.ok) throw new Error('Verse not found.');

    const data = await response.json();
    verseDisplay.textContent = `${data.reference}: \"${data.text.trim()}\"`;
  } catch (error) {
    verseDisplay.textContent = 'Error fetching verse. Please try another reference.';
    console.error(error);
  }
}
  

