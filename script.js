const inputTask = document.getElementById('new-task-input');

const addTaskBtn = document.getElementById('add-task-btn');

const taskList = document.getElementById('task-list');


// creating a Local Storage Key

const Task_storage_key = 'todotask';


// --Function Addtask to DOM

// Creates and adds a new task item to the unordered list in the HTML.
// `taskText`: The text content of the task.
// `isCompleted`: A boolean indicating if the task is already completed (for loading from storage).
function addTaskToDOM(taskText, isCompleted = false) {

    // Creating the <li> to add the items in the list
    const listItems = document.createElement('li');
    listItems.classList.add('task-item'); //Assigning the class to the list

    if (isCompleted) {
        listItems.classList.add('completed')
    }

    // 2. Create a span for the task text.
    const taskSpan = document.createElement('span');
    taskSpan.classList.add('task-text');
    taskSpan.textContent = taskText;

    // 3. Create a div for action buttons (Complete/Delete).
    const taskAction = document.createElement('div');
    taskAction.classList.add('task-actions');

    // 4. Create the "Complete" button (icon).
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('action-btn', 'complete-btn');
    completeBtn.innerHTML = '<i class="fa-solid fa-square-check"></i>';

    // 5. Create the "Delete" button (icon).
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('action-btn', 'delete-btn');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'

    taskList.appendChild(listItems)
    taskAction.appendChild(completeBtn)
    taskAction.appendChild(deleteBtn)
    listItems.appendChild(taskSpan)
    listItems.appendChild(taskAction)

}


//  Functions for local Storage

function saveTaskToLocalStorage() {

    const tasks = [];

    taskList.querySelectorAll('.task-item').forEach(item => {

        tasks.push({
            text: item.querySelector('.task-text').textContent,
            completed: item.classList.contains('completed')
        });
    });

    localStorage.setItem(Task_storage_key, JSON.stringify(tasks));
}

// Loads tasks from localStorage and displays them on the page.
function loadTaskFromLocalStorage() {
    const taskString = localStorage.getItem(Task_storage_key);

    if (taskString) {
        const tasks = JSON.parse(taskString);

        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    }
}

// --Event Listeners

// 1. Event listener for the "Add Task" button.
addTaskBtn.addEventListener('click', () => {
    const taskText = inputTask.value.trim();

    if (taskText !== '') {
        addTaskToDOM(taskText);
        saveTaskToLocalStorage();
        inputTask.value = '';
    }
    else {
        alert("Please enter a task");
    }
});


taskList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('.complete-btn')) {
        const taskItem = target.closest('.task-item');

        if (taskItem) {
            taskItem.classList.toggle('completed');
            saveTaskToLocalStorage();
        }
    }

    else if (target.closest('.delete-btn')) {
        const taskItem = target.closest('.task-item');

        if (taskItem) {
            taskItem.remove();
            saveTaskToLocalStorage();
        }
    }
});

loadTaskFromLocalStorage();
