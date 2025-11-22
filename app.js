console.log("JS підключено");

const now = new Date();
console.log("Поточна дата і час:", now);

import { addTask, deleteTask, toggleComplete, loadTasks, saveTasks } from "./todo.js";

const form = document.getElementById("todo-form");
const input = document.getElementById("task-input");
const list = document.querySelector(".todo-list");

const savedTasks = loadTasks();
savedTasks.forEach(task => {
  const li = document.createElement("li");

  if (task.completed) {
    li.classList.add("completed");
    const span = document.createElement("span");
    span.textContent = "✅ ";
    span.classList.add("check-mark");
    li.appendChild(span);
  }

  const textNode = document.createTextNode(task.text);
  li.appendChild(textNode);

  if (!task.completed) {
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.classList.add("delete-btn");
    li.appendChild(deleteBtn);
  }

  list.appendChild(li);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(list, input);
  saveTasks(list);
});

list.addEventListener("click", (event) => {
  deleteTask(event);
  saveTasks(list);
});

list.addEventListener("dblclick", (event) => {
  toggleComplete(event);
  saveTasks(list);
});
