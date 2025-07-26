window.onload = function () {
  renderTasks();
};

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const dueDate = document.getElementById("dueDateInput").value;
  const categorySelect = document.getElementById("categoryInput");
const category = categorySelect.options[categorySelect.selectedIndex].value;


  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    text,
    dueDate,
    category,
    completed: false
  };

  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);
  renderTasks();

  document.getElementById("taskInput").value = "";
  document.getElementById("dueDateInput").value = "";
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const filterCategory = document.getElementById("filterCategory").value;
  const tasks = getTasksFromStorage();

  tasks.forEach((task, index) => {
    if (filterCategory !== "All" && task.category !== filterCategory) return;

    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div>
        <strong>${task.text}</strong><br>
      <small>📅 ${task.dueDate || "No due date"} | 📁 ${task.category || "General"}</small>

      </div>
      <div>
        <button onclick="toggleComplete(${index})">✅</button>
        <button onclick="editTask(${index})">✏️</button>
        <button class="delete-btn" onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;

    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  const tasks = getTasksFromStorage();
  tasks[index].completed = !tasks[index].completed;
  saveTasksToStorage(tasks);
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasksFromStorage();
  tasks.splice(index, 1);
  saveTasksToStorage(tasks);
  renderTasks();
}

function editTask(index) {
  const tasks = getTasksFromStorage();
  const current = tasks[index];

  const newText = prompt("Edit task:", current.text);
  if (newText !== null && newText.trim() !== "") {
    current.text = newText.trim();
    saveTasksToStorage(tasks);
    renderTasks();
  }
}

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
