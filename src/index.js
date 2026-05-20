
import './style.css';

import { Task } from './task-src/task.js';
import { Project } from './project-src/project.js';
import { ProjectManager } from './project-src/project-manager.js';
import { TaskFilter } from './project-src/task-filter.js';
import { isToday, isTomorrow, isThisWeek, isPast, format } from 'date-fns';

const projectManager = new ProjectManager();

function attachDialogButtonListener() {

    addBaseProjects();
    attachCreateDeliverableListeners();
    loadFromStorage();
    projectManager.setBtnVisibility(false);

    const dialog = document.querySelector("dialog");
    dialog.dataset.taskID = 'none';
    const form = document.querySelector('form');

    document.querySelector("#close-btn").addEventListener("click", (event) => {
        event.preventDefault();
        form.reset();
        dialog.close();
    });

    document.querySelector("#submit-btn").addEventListener("click", (event) => {
        // Skip if the form is invalid
        if (!form.checkValidity()) {
            return;
        }
        event.preventDefault();
        const data = (new FormData(form));
        // Either new task or updating an existing one
        if (dialog.dataset.taskID === 'none') {
            projectManager.addTaksToProject(new Task(data));
        } else {
            const taskFound = projectManager.getActiveProject().getTaskList().find(task => task.taskID === dialog.dataset.taskID);
            taskFound.setData(data);
            const id = dialog.dataset.taskID;
            document.querySelector(`#${id} h3`).textContent = taskFound.getDeliverableName();
            document.querySelector(`#${id} p:first-of-type`).textContent = taskFound.getDescription();
            document.querySelector(`#${id} p:nth-of-type(2)`).textContent = `Due Date: ${format(taskFound.getDueDate(), 'do MMMM yyyy')}`
            document.querySelector(`#${id} p:last-of-type`).textContent = taskFound.getPriority();
            document.querySelector(`#${id} p:last-of-type`).setAttribute("p-class", taskFound.getPriority());
            dialog.dataset.taskID = 'none';
        }
        form.reset();
        dialog.close();
    });
}

function addBaseProjects() {
    projectManager.addProject(new TaskFilter('Today', isToday),
        new TaskFilter('Tomorrow', isTomorrow),
        new TaskFilter('This week', isThisWeek),
        new TaskFilter('Overdue', isPast));
}

function attachCreateDeliverableListeners() {

    document.querySelector("#add-task-btn").addEventListener("click", () => {
        const dialog = document.querySelector("dialog");
        dialog.showModal();
    });

    document.querySelector("#add-project-btn").addEventListener("click", () => {
        projectManager.createEditableProjectEntry();
    });
}

function loadFromStorage() {
    if (localStorage.length === 0) {
        return;
    }
    Object.keys(localStorage).forEach(function (key) {
        projectManager.addProject(Project.fromJSON(localStorage.getItem(key)));
    });
}

attachDialogButtonListener();