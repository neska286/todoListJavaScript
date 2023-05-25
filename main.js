const input = document.querySelector('.input')
const submit = document.querySelector('.add')
const tasks = document.querySelector('.tasks')


//create array for tasks

let todoItems =[]

if(localStorage.getItem("tasks")){
    todoItems = JSON.parse(localStorage.getItem("tasks"))
}
getDataFromLocalStorage()

submit.addEventListener('click',(eo)=>{
    // addTasks(input.value)
    if(input.value == "") alert('please enter your task')
    if(input.value !== ""){
        addTasks(input.value);
        input.value = ""
        tasks.style.display = "block"
    }
  
})
tasks.addEventListener("click",(e)=>{
    // console.log(e.target)
    let t = e.target;
    if(t.classList.contains('del')){
        deleteTask(t.parentElement.getAttribute("data-id"))
        t.parentElement.remove();      
    }
    if(t.classList.contains('item')){
      toogleStatusTask(t.getAttribute("data-id"))
      t.classList.toggle('done')
    }
})
function addTasks(taskText){
 let task ={
     id: Date.now(),
     title: taskText,
     isDone : false

 }
 todoItems.push(task)
 renderTodos(todoItems)
 //add tasks to local storage
 addTasksToLocalStorage(todoItems)
}

function renderTodos(todoItems){
 let displayTodos = todoItems.map((todo)=>( ` 
     <div class="todo-items">
            <div class="item ${todo.isDone ? "done" : ""}" data-id=${todo.id}>
            ${todo.title}
              <button class="delete-button del"><i class="fas fa-trash"></i></button>
            </div>
          </div>
          `
 ))

 tasks.innerHTML = displayTodos.join('')
}


function addTasksToLocalStorage(todoItems){
    window.localStorage.setItem("tasks",JSON.stringify(todoItems))
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks")
    if(data){
    let tasks = JSON.parse(data)
    renderTodos(tasks)
    }
}

function deleteTask(taskId){
    todoItems = todoItems.filter((item)=> item.id != taskId)

    addTasksToLocalStorage(todoItems)
   
}

function toogleStatusTask(taskId){
   for(let i =0 ; i < todoItems.length ; i++){
       console.log('status', todoItems[i],taskId)
       if(todoItems[i].id == taskId){
           todoItems[i].isDone ==  false ? (todoItems[i].isDone = true) : (todoItems[i].isDone =  false)
       }
   }
   addTasksToLocalStorage(todoItems)
}
