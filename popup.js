const loginBtn = document.getElementById("loginBtn");
const dashboard = document.getElementById("dashboard");
const loginDiv = document.getElementById("login");
const tasksList = document.getElementById("tasks");

loginBtn.addEventListener("click", () => {
  // Simulation connexion réussie
  loginDiv.style.display = "none";
  dashboard.style.display = "block";

  loadTasks();
});

function loadTasks() {
  const tasks = [
    { matiere: "Maths", devoir: "Exercice 12", date: "Demain" },
    { matiere: "Français", devoir: "Dissertation", date: "Lundi" }
  ];

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `${task.matiere} - ${task.devoir} (${task.date})`;
    tasksList.appendChild(li);
  });
}
