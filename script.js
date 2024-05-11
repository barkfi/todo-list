
let input = document.querySelector(".text"); 
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");
let arrayOfTasks = [];
if(localStorage.getItem("tasks")){
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
}

getDataFormLocalStorage();
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
};
taskDiv.addEventListener("click",(e)=>{
    if (e.target.classList.contains("del")){
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
       e.target.parentElement.remove(); 
    }
})
function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    arrayOfTasks.push(task);
    addElementToPageForm(arrayOfTasks);
}

function addElementToPageForm(arrayOfTasks) {
    taskDiv.innerHTML = "";
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        if (task.completed) {
            div.className = "done";
        }
        div.setAttribute("data-id", task.id); // Corrected attribute name
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        taskDiv.appendChild(div);
    });
}
function addDataToLocalStorageForm(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function  getDataFormLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementToPageForm(tasks);
    }
}
function deleteTaskWith(taskId){
//     for(let i=0; i<arrayOfTasks.length; i++){

// }
arrayOfTasks=arrayOfTasks.filter((task)=>task.id !== taskId);
addDataToLocalStorageForm(arrayOfTasks);
}