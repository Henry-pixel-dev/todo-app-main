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

let currentTheme = 'light';

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    toogleImg.src = currentTheme === 'light' ? 'images/icon-moon.svg' : 'images/icon-sun.svg';
});

addBtn.addEventListener('click', () => {
    const inputValue = inputArea.value.trim(); 
    if (inputValue == '') return; 

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

    p.textContent = inputValue;

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

    completeBtn.addEventListener('click', () => {
        const completeImg = document.createElement('img');
        completeImg.src = 'images/icon-check.svg';
        completeBtn.appendChild(completeImg);
        completeImg.classList.add('todo-check-icon');
        completeBtn.classList.toggle('checked');
        p.classList.toggle('completed-text');
        updateItemsRemaining();
    });

})