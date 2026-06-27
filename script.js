const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
let editItem = null;
window.onload = function () {
    loadTasks();
};

function addTask() {
    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }
if(editItem){
    editItem = null;
}
    createTask(taskInput.value);

    saveTasks();
   updateCounter();
    taskInput.value = "";
}

function createTask(text) {
    const li = document.createElement("li");

    li.innerHTML = `
    <span>${text}</span>
    <div>
        <button class="edit-btn" onclick="editTask(this)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    </div>
`;

    li.addEventListener("click", function (e) {
        if (e.target.tagName !== "BUTTON") {
            li.classList.toggle("completed");
            saveTasks();
        }
    });

    taskList.appendChild(li);
}

function deleteTask(button) {
    button.parentElement.parentElement.remove();
    saveTasks();
    updateCounter();
}

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem("tasks") || "";

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.onclick = function () {
            deleteTask(this);
        };
    });

    document.querySelectorAll("#taskList li").forEach(li => {
        li.addEventListener("click", function (e) {
            if (e.target.tagName !== "BUTTON") {
                li.classList.toggle("completed");
                saveTasks();
                updateCounter();
            }
        });
    });
updateCounter();
}
function editTask(button) {
    editItem = button.parentElement.parentElement;
    taskInput.value = editItem.querySelector("span").innerText;
    editItem.remove();
    saveTasks();
    updateCounter();
}
function updateCounter(){
    const total=document.querySelectorAll("#taskList li").length;
    const completed=document.querySelectorAll("#taskList li.completed").length;

    document.getElementById("totalTasks").innerText=total;
    document.getElementById("completedTasks").innerText=completed;
}

function clearAllTasks(){
    if(confirm("Delete all tasks?")){
        taskList.innerHTML="";
        saveTasks();
        updateCounter();
    }
}