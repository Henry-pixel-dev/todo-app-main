let task = JSON.parse(localStorage.getItem("task")) || [];

window.addEventListener('load', () => {
    task.forEach(taskObj => {
        if (ul.childElementCount === 1) {
            
            const newText = taskObj.text;
            addTask(newText);
        }else {
            return;
        } 
            
    });    
})

const toggleBtn = document.getElementById('toggleBtn');
const addBtn = document.getElementById('addBtn');
const inputArea = document.getElementById('inputArea');
const ul = document.getElementById('ul');
const itemsRemaining = document.getElementById('itemsRemaing');
const clearCompleted = document.getElementById('clearCompleted');
const allBtn = document.getElementById('allBtn');
const activeBtn = document.getElementById('activeBtn');
const completedBtn = document.getElementById('completedBtn');
const toogleImg = document.getElementById('toogleImg');
const filters = document.getElementById('filters');
const drag = document.getElementById('drag');
const display = document.getElementById('display');
const completeImg = document.createElement('img');
completeImg.src = 'images/icon-check.svg';
completeImg.style.display = 'none'


function addTask(text) { 
    if (text == '') return; 


    const id = Date.now() + Math.random();
    const taskObj = {id, text, completed: false};
    task.push(taskObj);
    localStorage.setItem("task", JSON.stringify(task))


    const li = document.createElement('li');
    const divBox = document.createElement('div');
    const completeBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    completeBtn.classList.add('completeBtn');
    const deleteImg = document.createElement('img');
    deleteImg.src = 'images/icon-cross.svg';
    const p = document.createElement('p');


    li.classList.add('li');
    divBox.classList.add('divBox');
    completeBtn.classList.add('complete-btn');
    p.classList.add('todo-text');

    p.textContent = text;

    deleteBtn.appendChild(deleteImg);
    divBox.appendChild(completeBtn);
    divBox.appendChild(p);
    li.appendChild(divBox);
    li.appendChild(deleteBtn);
    ul.insertBefore(li, display);

    inputArea.value = '';

    filters.classList.remove('hidden');
    display.classList.remove('hidden');
    drag.classList.remove('hidden');
    filters.style.display = 'flex';
    display.style.display = 'flex';
    drag.style.display = 'flex'
    

    completeBtn.addEventListener('click', () => {
        if (completeImg.style.display === 'none'){
            completeImg.style.display ='block'
        } else {
            completeImg.style. display = 'none';
        }
        completeBtn.appendChild(completeImg);
        completeImg.classList.add('todo-check-icon');
        completeBtn.classList.toggle('checked');
        p.classList.toggle('completed-text');

        task = task.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
        );
        localStorage.setItem("task", JSON.stringify(task));
        const users = localStorage.getItem("task")
        console.log(users)
        updateItemsRemaining();
    });

    deleteBtn.addEventListener('click', () => {
        ul.removeChild(li)
        task =  task.filter(t => t.id !== id)
        console.log(task)
        localStorage.removeItem("task")
        const users = localStorage.getItem("task")
        console.log(users)

        if(ul.childElementCount === 1) {
            filters.style.display = 'none';
            display.style.display = 'none';
            drag.style.display = 'none'
        } else {
            filters.style.display = 'flex';
            display.style.display = 'flex';
            drag.style.display = 'flex'
        }
    })
}

let currentTheme = 'light';

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    toogleImg.src = currentTheme === 'light' ? 'images/icon-moon.svg' : 'images/icon-sun.svg';
});

addBtn.addEventListener('click', () => {
    const displaytext = inputArea.value.trim();
    addTask(displaytext);
})

function updateItemsRemaining() {

}


function render(arrayToRender) {
    ul.innerHTML = '';
    arrayToRender.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t.text
        if(t.completed) li.classList.add('done');
        ul.append(li)    
    })
}

completedBtn.addEventListener('click', () => {
   const completedTasks = task.filter(t => t.completed);
render(completedTasks);

})

activeBtn.addEventListener('click', () => {
    const pendingTasks = task.filter(t => !t.completed);
    render(pendingTasks);

})
allBtn.addEventListener('click', () => {
    render(task)
})
// localStorage.clear()