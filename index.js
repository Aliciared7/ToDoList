function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value !== "") {
        var newTask = document.createElement("li");
        newTask.textContent = taskInput.value;
        
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = function() {
            taskList.removeChild(newTask);
        };

        var toggleButton = document.createElement("button");
        toggleButton.textContent = "Hecho";
        toggleButton.onclick = function() {
            newTask.classList.toggle("done");
        };
        
        newTask.appendChild(toggleButton);
        newTask.appendChild(deleteButton);

        taskList.appendChild(newTask);
        taskInput.value = "";
    }
}