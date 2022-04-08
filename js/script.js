// select everything
// select the todo-form
const todoForm = document.querySelector(".todo-form");
// select the input box
const todoInput = document.querySelector(".todo-input");

const todoEditInput = document.querySelector("#edit-todo-input");
const saveUpdateTodo = document.querySelector("#edit-todo-form");
const editInputField = document.querySelector("#edit-todo-input");

const todoItemsList = document.querySelector(".todo-items");

// array which stores every todos
let todos = [];
var idTodo;
var indTodo;

// add an eventListener on form, and listen for submit event
todoForm.addEventListener("submit", function (event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault();
  addTodo(todoInput.value); // call addTodo function with input box current value
  console.log(saveUpdateTodo);
});

saveUpdateTodo.addEventListener("submit", function (event) {
  event.preventDefault();
  let newValue = todoEditInput.value;
  updateTodo(indTodo, newValue);
  addToLocalStorage(todos);
  editInputField.setAttribute("disabled", "disabled");
});
// function to add todo
function addTodo(item) {
  // if item is not empty
  if (item !== "") {
    // make a todo object, which has id, name, and completed properties
    const todo = {
      id: Date.now(),
      name: item,
    };

    // then add it to todos array
    todos.push(todo);
    addToLocalStorage(todos); // then store it in localStorage

    // finally clear the input box value
    todoInput.value = "";
  }
}
// function to render given todos to screen
function renderTodos(todos) {
  // clear everything inside <ul> with class=todo-items
  todoItemsList.innerHTML = "";

  // run through each item inside todos
  todos.forEach(function (item) {
    const itemTodo = document.createElement("div");

    itemTodo.setAttribute("class", "item");
    itemTodo.setAttribute("data-key", item.id);
    itemTodo.innerHTML = `
      <input type="checkbox" class="chk-edit-item" >
      <span class="item-title">${item.name}</span>
      <span ><i class="edit-icon fa-solid fa-pen" ></i></span>
      <span ><i class="remove-icon fa-solid fa-trash-can"></i></span>

    `;
    // finally add the <li> to the <ul>
    todoItemsList.append(itemTodo);
  });
}

// function to add todos to local storage
function addToLocalStorage(todos) {
  // conver the array to string then store it.
  localStorage.setItem("todos", JSON.stringify(todos));
  // render them to screen
  renderTodos(todos);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem("todos");
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  
  todos = todos.filter(function (item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(todos);
}
// search by id and updates the todos array with new value
function updateTodo(id, value) {
  todos[indTodo].name = value;
  localStorage.setItem("todos", JSON.stringify(todos));
  todos = JSON.parse(localStorage.getItem("todos"));
  todoEditInput.value = todos[indTodo].name;
  saveUpdateTodo.reset();
  indTodo = "";
}

// initially get everything from localStorage
getFromLocalStorage();

function saveEditTodo(index) {
  todos[index].name = todoEditInput.value;
  // update the localStorage
  addToLocalStorage(todos);
}

// listen for click event in edit and delete button
todoItemsList.addEventListener("click", function (event) {
  // check if the event is on checkbox

  // check if that is a edit-icon
  if (event.target.className == "edit-icon fa-solid fa-pen") {
    const todoTitle = document.querySelector(".item-title");
    const idTodo = event.target.parentNode.parentNode.getAttribute("data-key");
    const storedTodos = JSON.parse(localStorage.getItem("todos"));

    indTodo = storedTodos.findIndex((element) => element.id == idTodo);

    todoEditInput.value = todos[indTodo].name;
    editInputField.removeAttribute("disabled");
    editInputField.focus();
    console.log(event.target.parentNode.parentNode.getAttribute("data-key"));
  }

  // check if that is a delete-button
  if (event.target.className == "remove-icon fa-solid fa-trash-can") {
    console.log("ok");
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(event.target.parentNode.parentNode.getAttribute("data-key"));
  }
});
