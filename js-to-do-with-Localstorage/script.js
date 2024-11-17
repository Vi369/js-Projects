document.addEventListener('DOMContentLoaded', () => {

const inputText = document.getElementById('input');
const addBtn = document.getElementById('add');
const list = document.getElementById('list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

if(tasks.length > 0){
    tasks.forEach(task => renderTask(task));
}

addBtn.addEventListener('click', () => {
    const text = inputText.value.trim();
    if(text === "") return;

    const newTask = {
        id: Date.now(),
        text,
        completed: false
    }

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    inputText.value = '';
})

// save to local storage
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// render task to the list
function renderTask(task){
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    if(task.completed){
        li.classList.add('completed');
    }

    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>
    `

    li.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') return;
        li.classList.toggle('completed');
        task.completed = !task.completed;
        saveTasks();
    })

    li.querySelector('button').addEventListener('click', (e)=>{
        e.stopPropagation()

        tasks = tasks.filter((t)=> t.id !== task.id);
        // remove task 
        li.remove();
        // update local storage
        saveTasks();
    })

    list.appendChild(li);
}

})