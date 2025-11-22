export const createTaskItem = (text) => {
  const li = document.createElement("li");
  li.textContent = text;
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.classList.add("delete-btn");
  li.appendChild(deleteBtn);
  return li;
};

export const addTask = (list, input) => {
  const taskText = input.value.trim();
  if (taskText === "") return;
  const newTask = createTaskItem(taskText);
  list.appendChild(newTask);
  input.value = "";
};

export const deleteTask = (event) => {
  if (event.target.classList.contains("delete-btn")) {
    event.target.parentElement.remove();
  }
};

export const toggleComplete = (event) => {
  const li = event.target;
  if (li.tagName !== "LI") return;

  li.classList.toggle("completed");
  const checkMark = li.querySelector(".check-mark");
  const deleteBtn = li.querySelector(".delete-btn");

  if (li.classList.contains("completed")) {
    if (!checkMark) {
      const span = document.createElement("span");
      span.textContent = "✅ ";
      span.classList.add("check-mark");
      li.insertBefore(span, li.firstChild);
    }
    if (deleteBtn) deleteBtn.remove();
  } else {
    if (checkMark) li.removeChild(checkMark);
    if (!deleteBtn) {
      const btn = document.createElement("button");
      btn.innerHTML = "🗑️";
      btn.classList.add("delete-btn");
      li.appendChild(btn);
    }
  }
};

export const saveTasks = (list) => {
  const tasks = [];
  list.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.textContent.replace("🗑️", "").replace("✅", "").trim(),
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const loadTasks = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};
