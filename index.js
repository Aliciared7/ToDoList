const taskInput = document.getElementById("task");
const addBtn = document.getElementById("add");
const taskList = document.getElementById("taskList");
const deleteBtn = document.getElementById("delete");
const doneBtn = document.getElementById("done");
const currentDateContainer = document.getElementById("currentDate");


window.addEventListener("load", () => {
    loadTasks();
    updateCurrentDate();
});


addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTask(taskText, false); 
        saveTasks();
        taskInput.value = "";
    }
});

function createTask(text, completed, backgroundColor) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <input type="checkbox" ${completed ? "checked" : ""}>
        <span>${text}</span>
        <i class="fas fa-edit edit-icon"></i>
    `;
    taskList.appendChild(taskItem);

    const checkbox = taskItem.querySelector("input[type=checkbox]");
    const editIcon = taskItem.querySelector(".edit-icon");
    const span = taskItem.querySelector("span");

    checkbox.addEventListener("change", () => {
        taskItem.classList.toggle("completed");
        saveTasks();
    });


    editIcon.addEventListener("click", () => {
        const newText = prompt("Editar tarea", span.textContent);
        if (newText !== null) {
            span.textContent = newText;
            saveTasks();
        }
    });


    if (completed) {
        taskItem.classList.add("completed");
        taskItem.style.backgroundColor = backgroundColor || "#c8baba";
    }
}


deleteBtn.addEventListener("click", () => {
    const completedTasks = taskList.querySelectorAll(".completed");
    completedTasks.forEach((task) => {
        task.remove();
    });
    saveTasks();
});


doneBtn.addEventListener("click", () => {
    const completedTasks = taskList.querySelectorAll(".completed");
    completedTasks.forEach((task) => {
        task.style.backgroundColor = "#c8baba";
    });
    saveTasks();
});


function saveTasks() {
    const tasks = [];
    const taskItems = taskList.children;

    for (let i = 0; i < taskItems.length; i++) {
        const taskText = taskItems[i].querySelector("span").textContent;
        const isCompleted = taskItems[i].classList.contains("completed");
        const backgroundColor = taskItems[i].style.backgroundColor;

        tasks.push({ text: taskText, completed: isCompleted, backgroundColor: backgroundColor });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);

        tasks.forEach((task) => {
            createTask(task.text, task.completed, task.backgroundColor);
        });
    }
}

function updateCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    currentDateContainer.textContent = `${padZero(day)}/${padZero(month)}/${year}`;
}

function padZero(number) {
    return number < 10 ? `0${number}` : number;
}


