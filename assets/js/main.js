window.addEventListener("load", () => {
    const addForm = document.querySelector("#add-task-form")
  
    const newTaskInput = document.querySelector("#new-task-input")
    const editForm = document.querySelector("#edit-task-form")
    const editInput = document.querySelector("#edit-task-input")
    const list_el = document.querySelector(".content")

    
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const task = newTaskInput.value
  
       if (!task) {
         alert("Please fill out the task")
         return;
     }
    
    const task_el = document.createElement("div")
    task_el.classList.add("content-item")
    const taskEditChkb = document.createElement("input")
    taskEditChkb.classList.add("chk-edit-item")
    taskEditChkb.type ="checkbox"

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("item-title");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readeonly", "readonly");

    // const taskDescription = document.createElement("span")
    // taskDescription.classList.add("item-title")
    // taskDescription.innerText = task
    const taskEditicon = document.createElement("span")
    taskEditicon.classList.add("edit-icon")
    taskEditicon.innerHTML = `<i class="fa-solid fa-pen" ></i>`
    taskRemoveicon = document.createElement("span")
    taskRemoveicon.classList.add("remove-icon")
    taskRemoveicon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`


    // const task_constent_el = document.createElement("div");
    // task_constent_el.classList.add("content");

     list_el.appendChild(task_el)
     task_el.appendChild(taskEditChkb)
     task_el.appendChild(task_input_el)
     task_el.appendChild(taskEditicon)
     task_el.appendChild(taskRemoveicon)

    newTaskInput.value = "";
    const checkbox = document.querySelector('.chk-edit-item')
    //const checkbox = taskEditChkb.getElementsByClassName('chk-edit-item');
    console.log(checkbox)
    checkbox.addEventListener('change', e => {

    if(e.target.checked){
        alert("Task checked !")
    }

});
     taskEditChkb.addEventListener('checked',() =>{
       alert("Task checked !")
     })
     taskEditicon.addEventListener('click',() =>{
      alert(" Clicked to edit!")
     })

     //number of child of a node
    //  let numb = document.querySelector(".content").children.length
    //  console.log (numb)
  
  })
})