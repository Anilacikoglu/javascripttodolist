// Tüm elementleri seçme
const todoInput = document.querySelector("#task");
const list = document.querySelector("#list");
const todoList = document.querySelector(".list-group");
const container = document.querySelector(".container");

document.addEventListener("DOMContentLoaded",loadAllTodosToUI);

todoList.addEventListener("click",deleteTodo)

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if (newTodo ==="") {
        showAlert("Danger","Lütfen bir todo girin");
    }
    else{
        addTodoUI(newTodo);
        addTodoStorage(newTodo);
    }
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoUI(todo);
    })
}

function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodoUI(newTodo) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";
     listItem.appendChild(document.createTextNode(newTodo));
     listItem.appendChild(link);
     todoList.appendChild(listItem);
    todoInput.value="";
}


function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    container.appendChild(alert);

    setTimeout(function(){
        alert.remove();

    },1000);



}


function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi...");
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1); 
        }

    });

    localStorage.setItem("todos",JSON.stringify(todos));

}