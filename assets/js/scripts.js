let tasks = [];

const taskInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const totalTask = document.getElementById("total-task");
const completedTask = document.getElementById("completed-task");
const pendingTask = document.getElementById("pending-task");
const todoList = document.getElementById("todo-list");

function addTask() {
  const description = taskInput.value;

  if (description !== "") {
    const newTask = {
      id: Date.now(),
      description: description,
      completed: false,
    };

    tasks.push(newTask);
    taskInput.value = "";
    renderTask();
  }
}

addBtn.addEventListener("click", addTask);

function renderTask() {
  todoList.innerHTML = tasks
    .map(
      (task) => `
      <ul class="titleTask">
        <li>
            <span>${task.id}</span>
        </li>
        <li>
            <span>${task.description}</span>
        </li>
        <li>
            <input type="checkbox" ${
              task.completed ? "checked" : ""
            } onchange="toogle(${task.id})"/>
        </li>
        <li>
            <button id='delete-btn' onclick="deleteTask(${task.id})">❌</button>
        </li>
        </ul>
            
       
    `
    )
    .join("");

  updateCounter();
}

function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  totalTask.innerHTML = total;
  completedTask.innerHTML = completed;
  pendingTask.innerHTML = pending;
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTask();
}

function toogle(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTask();
  }
}
