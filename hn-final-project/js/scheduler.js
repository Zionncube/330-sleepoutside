// ======= Footer Year ========
document.getElementById("year").textContent = new Date().getFullYear();

// ======= Daily Intention Scheduler ========
const morningInput = document.getElementById("morning");
const afternoonInput = document.getElementById("afternoon");
const eveningInput = document.getElementById("evening");
const statusMessage = document.getElementById("statusMessage");
const scheduleForm = document.getElementById("scheduleForm");

function loadSchedule() {
  morningInput.value = localStorage.getItem("schedule_morning") || "";
  afternoonInput.value = localStorage.getItem("schedule_afternoon") || "";
  eveningInput.value = localStorage.getItem("schedule_evening") || "";
}

scheduleForm.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("schedule_morning", morningInput.value);
  localStorage.setItem("schedule_afternoon", afternoonInput.value);
  localStorage.setItem("schedule_evening", eveningInput.value);
  statusMessage.textContent = "✅ Schedule saved successfully!";
  setTimeout(() => statusMessage.textContent = "", 3000);
});

loadSchedule();

// ======= Task Scheduler ========
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDate = document.getElementById("taskDate");
const todayTasks = document.getElementById("todayTasks");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = {
    title: taskTitle.value.trim(),
    date: taskDate.value,
  };

  if (!task.title || !task.date) return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskTitle.value = "";
  taskDate.value = "";

  displayTodayTasks();
});

function displayTodayTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const today = new Date().toISOString().split("T")[0];

  const filtered = tasks.filter(task => task.date === today);
  todayTasks.innerHTML = "";

  if (filtered.length === 0) {
    todayTasks.innerHTML = "<li>No tasks scheduled for today.</li>";
    return;
  }

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    todayTasks.appendChild(li);
  });
}

displayTodayTasks();
