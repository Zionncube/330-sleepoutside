document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('goalForm');
  const goalText = document.getElementById('goalText');
  const goalCategory = document.getElementById('goalCategory');
  const goalDeadline = document.getElementById('goalDeadline');
  const goalList = document.getElementById('goalItems');

  let goals = JSON.parse(localStorage.getItem('goals') || '[]');

  function renderGoals() {
    goalList.innerHTML = '';
    goals.forEach((goal, index) => {
      const li = document.createElement('li');
      li.className = 'goal-item';
      li.innerHTML = `
        <span><strong>${goal.category}:</strong> ${goal.text} (by ${goal.deadline})</span>
        <button onclick="completeGoal(${index})" aria-label="Mark goal as complete">✓</button>
      `;
      goalList.appendChild(li);
    });
  }

  window.completeGoal = function(index) {
    goals.splice(index, 1);
    localStorage.setItem('goals', JSON.stringify(goals));
    renderGoals();
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    const newGoal = {
      text: goalText.value.trim(),
      category: goalCategory.value,
      deadline: goalDeadline.value
    };
    goals.push(newGoal);
    localStorage.setItem('goals', JSON.stringify(goals));
    renderGoals();
    form.reset();
  });

  renderGoals();
});
