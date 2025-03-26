{

  let tasks = [];
  let hideCompleted = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent, done: false },
    ];
    render();
    
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
  
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) => 
    index === taskIndex ? { ...task, done: !task.done } : task
  );

    render();
  };

  const hideCompletedTasks = () => {
    hideCompleted = !hideCompleted;
    render();
  };

  const completeAllTasks = () => {
    if (tasks.some(task => !task.done)) {
      tasks = tasks.map(task => ({ ...task, done: true }));
    };
    render();
  };

  const getVisibleTasks = () => {
    return tasks.filter(task => !hideCompleted || !task.done);
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    const removeTaskCallback = (index) => {
      const visibleTasks = getVisibleTasks();
      const actualIndex = tasks.indexOf(visibleTasks[index]);
      removeTask(actualIndex);
    };
    
    const toggleTaskDoneCallback = (index) => {
      const visibleTasks = getVisibleTasks();
      const actualIndex = tasks.indexOf(visibleTasks[index]);
      toggleTaskDone(actualIndex);
    };
  
    removeButtons.forEach((removeButton, index) => {
      removeButton.removeEventListener("click", removeTaskCallback);
      removeButton.addEventListener("click", () => removeTaskCallback(index));
    });
    
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.removeEventListener("click", toggleTaskDoneCallback);
      toggleDoneButton.addEventListener("click", () => toggleTaskDoneCallback(index));
    });
  };

  const renderTasks = () => {
    const taskListElement = document.querySelector(".js-tasks");
    const visibleTasks = getVisibleTasks();
  
    taskListElement.innerHTML = visibleTasks
      .map(
        (task, index) => `
        <li class="list__item ${task.done ? "list__item--done" : ""}">
          <button class="js-done list__checkbox" data-index="${index}">
            ${task.done ? "&#10004;" : ""}
          </button>
          <span class="list__text ${task.done ? "list__text--done" : ""}">
            ${task.content}
          </span>
          <button class="js-remove list__deleteButton" data-index="${index}">
            &#128465;
          </button>
        </li>`
      )
      .join("");
  };

  const renderButtons = () => {
    document.querySelector(".js-hideCompleted").textContent = hideCompleted ? "Pokaż ukończone" : "Ukryj ukończone";
    document.querySelector(".js-completeAll").disabled = tasks.every(task => task.done);
  };

  const bindButtonsEvents = () => {
    document.querySelector(".js-hideCompleted").addEventListener("click", hideCompletedTasks);
    document.querySelector(".js-completeAll").addEventListener("click", completeAllTasks);
  };

  const render = () => {
    renderTasks();    
    renderButtons();
    bindEvents();
    bindButtonsEvents();

  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const taskInput = document.querySelector(".js-newTask");
    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }
    addNewTask(newTaskContent);
    taskInput.value = "";
    taskInput.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);

  };

  init();
}