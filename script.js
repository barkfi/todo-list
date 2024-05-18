document.addEventListener("DOMContentLoaded", function() {
    let input = document.querySelector(".text-input");
    let submit = document.querySelector(".add-btn");
    let taskDiv = document.getElementById("taskDiv");
    let arrayOfTasks = [];

    if(localStorage.getItem("tasks")){
        arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
        addElementToPageForm(arrayOfTasks);
    }

    submit.onclick = function () {
        if (input.value !== "") {
            addTaskToArray(input.value);
            input.value = "";
        }
    };

    taskDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            deleteTaskWith(e.target.parentElement.parentElement.getAttribute("data-id"));
            e.target.parentElement.parentElement.remove();
        }
        if (e.target.classList.contains("task")) {
            toggleStatusTaskWith(e.target.getAttribute("data-id"));
            e.target.classList.toggle("done");
        }
    });

    function addTaskToArray(taskText) {
        const task = {
            id: Date.now(),
            title: taskText,
            completed: false,
        };
        arrayOfTasks.push(task);
        addElementToPageForm(arrayOfTasks);
        addDataToLocalStorageFrom(arrayOfTasks);
    }

    function addElementToPageForm(arrayOfTasks) {
        taskDiv.innerHTML = "";
        arrayOfTasks.forEach((task) => {
            let div = document.createElement("div");
            div.className = task.completed ? "task done" : "task";
            div.setAttribute("data-id", task.id);
            div.appendChild(document.createTextNode(task.title));

            let span = document.createElement("span");
            span.className = "del";

            let deleteButton = document.createElement("button");
            deleteButton.className = "delete-btn";
            deleteButton.appendChild(document.createTextNode("Delete"));

            span.appendChild(deleteButton);
            div.appendChild(span);

            taskDiv.appendChild(div);
        });
    }

    function addDataToLocalStorageFrom(arrayOfTasks) {
        window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    }

    function deleteTaskWith(taskId) {
        arrayOfTasks = arrayOfTasks.filter(task => task.id !== parseInt(taskId));
        addDataToLocalStorageFrom(arrayOfTasks);
    }

    function toggleStatusTaskWith(taskId) {
        arrayOfTasks = arrayOfTasks.map(task => {
            if (task.id == taskId) {
                task.completed = !task.completed;
            }
            return task;
        });
        addDataToLocalStorageFrom(arrayOfTasks);
    }
});
