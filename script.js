let task = JSON.parse(localStorage.getItem("task")) || [];

// window.addEventListener('load', () => {
//     task.forEach(taskObj => {
//         if (ul.childElementCount === 1) {
            
//             const newText = taskObj.text;
//             addTask(newText);
//         }else {
//             return;
//         } 
            
//     });    
// })

const toggleBtn = document.getElementById('toggleBtn');
const addBtn = document.getElementById('addBtn');
const inputArea = document.getElementById('inputArea');
const ul = document.getElementById('ul');
const itemsRemaining = document.getElementById('itemsRemaing');
const clearCompleted = document.getElementById('clearCompleted');
// const allBtn = document.getElementById('allBtn');
// const activeBtn = document.getElementById('activeBtn');
// const completedBtn = document.getElementById('completedBtn');
const toogleImg = document.getElementById('toogleImg');
const filters = document.querySelectorAll('.filters');
const drag = document.getElementById('drag');
const display = document.getElementById('display');
const completeImg = document.createElement('img');
completeImg.src = 'images/icon-check.svg';
completeImg.style.display = 'none'


function isVissible(el){
    return el.offsetParent !== null;
}


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

    display.classList.remove('hidden');
    drag.classList.remove('hidden');
    display.style.display = 'flex';
    drag.style.display = 'flex'

    filters.forEach(fliter =>{
        const subcard = fliter.children[0];

        if (isVissible(subcard)) {
            console.log(subcard.classList.contains('hidden'))
            return;
        } else {
            
            fliter.classList.remove('hidden');
            fliter.style.display = 'flex';
        }

        const allBtn = subcard.querySelector(".allBtn")
        const activeBtn = subcard.querySelector(".activeBtn")
        const completedTaskBtn = subcard.querySelector(".completedBtn")

        // Inside your filters.forEach block, replace the event listeners with:
        allBtn.addEventListener('click', () => render(task));

        activeBtn.addEventListener('click', () => render(task.filter(t => !t.completed)));

        completedTaskBtn.addEventListener('click', () => render(task.filter(t => t.completed)));

    })
    
    

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
            // filters.style.display = 'none';
            display.style.display = 'none';
            drag.style.display = 'none'

            filters.forEach(filter => {
                filter.style.display = 'none'
            })
        } else {
            // filters.style.display = 'flex';
            display.style.display = 'flex';
            drag.style.display = 'flex'

            filters.forEach(filter => {
                filter.style.display = 'flex'
            })
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



function render(arrayToRender) {
    // Remove all existing li elements except the display/drag elements
    const existingItems = ul.querySelectorAll('li.li');
    existingItems.forEach(li => li.remove());

    arrayToRender.forEach(t => {
        const li = document.createElement('li');
        const divBox = document.createElement('div');
        const completeBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        const deleteImg = document.createElement('img');
        const checkImg = document.createElement('img');
        const p = document.createElement('p');

        deleteImg.src = 'images/icon-cross.svg';
        checkImg.src = 'images/icon-check.svg';
        checkImg.classList.add('todo-check-icon');
        checkImg.style.display = t.completed ? 'block' : 'none';

        li.classList.add('li');
        divBox.classList.add('divBox');
        completeBtn.classList.add('complete-btn');
        if (t.completed) completeBtn.classList.add('checked');
        p.classList.add('todo-text');
        if (t.completed) p.classList.add('completed-text');

        p.textContent = t.text;

        completeBtn.appendChild(checkImg);
        deleteBtn.appendChild(deleteImg);
        divBox.appendChild(completeBtn);
        divBox.appendChild(p);
        li.appendChild(divBox);
        li.appendChild(deleteBtn);
        ul.insertBefore(li, display);

        // Toggle complete
        completeBtn.addEventListener('click', () => {
            task = task.map(tk =>
                tk.id === t.id ? { ...tk, completed: !tk.completed } : tk
            );
            // Update local t reference
            t.completed = !t.completed;
            localStorage.setItem("task", JSON.stringify(task));

            checkImg.style.display = t.completed ? 'block' : 'none';
            completeBtn.classList.toggle('checked');
            p.classList.toggle('completed-text');
            updateItemsRemaining();
        });

        // Delete task
        deleteBtn.addEventListener('click', () => {
            task = task.filter(tk => tk.id !== t.id);
            localStorage.setItem("task", JSON.stringify(task));
            li.remove();

            if (ul.querySelectorAll('li.li').length === 0) {
                display.style.display = 'none';
                drag.style.display = 'none';
                filters.forEach(f => f.style.display = 'none');
            }

            updateItemsRemaining();
        });
    });

    updateItemsRemaining();
}

function updateItemsRemaining() {
    const remaining = task.filter(t => !t.completed).length;
    itemsRemaining.textContent = `${remaining} item${remaining !== 1 ? 's' : ''} left`;
}


localStorage.clear()