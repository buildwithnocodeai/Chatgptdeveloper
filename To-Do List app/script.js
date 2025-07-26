// Load tasks when the page loads
window.onload = function () {
  loadTasks();
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    text: taskText,
    completed: false,
  };

  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);

  renderTasks();
  taskInput.value = "";
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasksFromStorage();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  const tasks = getTasksFromStorage();
  tasks[index].completed = !tasks[index].completed;
