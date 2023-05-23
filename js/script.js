{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {...tasks[taskIndex], done: !tasks[taskIndex].done},
            ...tasks.slice(taskIndex + 1)
        ];
        
        
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove")

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done")

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {

        let tasksListHTMLContent = "";

        for (const task of tasks) {
            tasksListHTMLContent += `
            <li class="list__item">
                <button class="js-done list__button list__button--toggleDone">
                    ${task.done ? "✔" : ""}
                </button>   
                <button class="js-remove list__button list__button--remove">
                🗑️
                </button>
                <span class="${task.done ? " list__item--toggleDone" : ""}">
                ${task.content}
                </span>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
    };

    const render = () => {
        renderTasks();


        bindRemoveEvents();
        bindToggleDoneEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask")
        const newTaskContent = newTaskInput.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        }

        newTaskInput.focus();

        newTaskInput.value = "";
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form")

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}