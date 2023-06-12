{
    let tasks = [];

    let hideDoneTasks = false

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        // tasks = [
        //     ...tasks.slice(0, taskIndex),
        //     ...tasks.slice(taskIndex + 1)
        // ];

        //lub

        tasks = tasks.filter((_, index) => index !== taskIndex);

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        // tasks = [
        //     ...tasks.slice(0, taskIndex),
        //     { ...tasks[taskIndex], done: !tasks[taskIndex].done },
        //     ...tasks.slice(taskIndex + 1)
        // ];
        
        //lub

        tasks = tasks.map((task, index) => {
            if (index === taskIndex) {
                return { ...task, done: !task.done };
            }
            return task;
        });

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
                <li 
                class="tasks__item ${hideDoneTasks && task.done ? "tasks__item--hideDone" : ""}"
                >
                    <button class="js-done tasks__button tasks__button--toggleDone">
                        ${task.done ? "✔" : ""}
                    </button>   
                    <span class="${task.done ? " tasks__item--toggleDone" : ""}">
                    ${task.content}
                    </span>
                    <button class="js-remove tasks__button tasks__button--remove">
                    🗑️
                    </button>
                </li>
                `;
        }

        document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
    };

    const renderButtons = () => {
        const allTasksDone = tasks.every(task => task.done);
        const IsAnyTaskDone = tasks.some(task => task.done);

        const showButtons = `
            <button class="button js-hideDoneButton">
            ${hideDoneTasks && IsAnyTaskDone ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="button js-doneAllTasksButton" ${allTasksDone ? "disabled" : ""}>
            Ukończ wszystkie
            </button>
        `;

        const hideButtons = ``;

        const buttonsContent = tasks.length === 0 ? hideButtons : showButtons;

        document.querySelector(".js-buttons").innerHTML = buttonsContent;
    };

    const bindButtonsEvents = () => {
        const doneAllTasksButton = document.querySelector(".js-doneAllTasksButton");
        const hideDoneButton = document.querySelector(".js-hideDoneButton");

        if (doneAllTasksButton) {
            doneAllTasksButton.addEventListener("click", toggleAllTaskDone)
        };

        if (hideDoneButton) {
            hideDoneButton.addEventListener("click", toggleHideDone)
        };
    };

    const toggleAllTaskDone = () => {
        tasks = tasks.map(task => ({ ...task, done: true }));

        render();
    };

    const toggleHideDone = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
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