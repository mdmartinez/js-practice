document.addEventListener('DOMContentLoaded', function() {
  // defines variables
  const addTask = document.querySelector('form'),
  taskLog = document.querySelector('.task-bin'),
  initialPrompt = document.querySelector('.initial-prompt'),
  hideTasks = document.querySelector('.hide-checkbox'),
  tasksUl = document.querySelector('.new-element-bin ul'),
  deleteButton = document.querySelector('.remove'),
  newElementBin = document.querySelector('.new-element-bin');

  // "Add task" button event handle
  addTask.addEventListener('submit', function(action) {
    // logs the value of input field to the console
    action.preventDefault();

    let value = document.querySelector('#new-task').value;
    console.log(value);

    // prevents empty inputs from being logged
    if(value.trim().length === 0) {
      return action.preventDefault();
    } else {
      value.trim();
    }

    // Creates new elements
    const li = document.createElement("li"),
    task = document.createElement("span"),
    remove = document.createElement("span");

    // Assigns new element the user-submitted value
    task.textContent = value;
    remove.textContent = "Remove";

    // Adds classes to newly created elements
    task.classList.add('tasks');
    remove.classList.add('remove');

    // appends new task to the DOM
    li.appendChild(task);
    li.appendChild(remove);
    tasksUl.appendChild(li);

    // erases placeholder text for empty task bin
    if(taskLog.children[1].className !== "new-element-bin") {
      taskLog.removeChild(document.querySelector('.initial-prompt'));
    }

    // resets input field
    addTask.reset();

  });

  hideTasks.addEventListener('change', function(e) {
    // hides tasks list
    if(hideTasks.checked) {
      tasksUl.style.display = 'none';
    } else {
      tasksUl.style.display = 'initial';
    }
  });

  const searchbar = document.querySelector('#search-field');
  searchbar.addEventListener('keyup', function(e) {
    const term = e.target.value.toLowerCase();
    let liTags = Array.from(tasksUl.getElementsByTagName('li'));

    // enables search functionality
    liTags.map(function(li) {
      let liContent = li.firstElementChild.textContent;
      if (liContent.toLowerCase().indexOf(term) != -1) {
        li.style.display = 'block';
      } else {
        li.style.display = 'none';
      }
    });
  });

  tasksUl.addEventListener('click', function(e) {
        // removes completed tasks from the bin
        if(e.target.className === "remove") {
          const li = e.target.parentElement;
          tasksUl.removeChild(li);
        }
      });

});