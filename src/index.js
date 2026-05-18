
import './style.css';

import { Task } from './task-src/task.js';
import { Project } from './project-src/project.js';
import { ProjectManager } from './project-src/project-manager.js';
import { TaskFilter } from './project-src/task-filter.js';
import { isToday, isTomorrow, isThisWeek, isBefore } from 'date-fns';

const projectManager = new ProjectManager();

projectManager.setBtnVisibility(false);

function attachDialogButtonListener() {

    addBaseProjects();
    attachCreateDeliverableListeners();
    loadFromStorage();

    const dialog = document.querySelector("dialog");
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
        projectManager.addTaksToProject(new Task(data));
        form.reset();
        dialog.close();
    });
}

function addBaseProjects() {
    projectManager.addProject(new TaskFilter('Today', isToday),
        new TaskFilter('Tomorrow', isTomorrow),
        new TaskFilter('This week', isThisWeek),
        new TaskFilter('Overdue', isBefore, new Date()));
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
        projectManager.addProject(new Project(new Map(Object.entries(JSON.parse(localStorage.getItem(key))))));
    });
}

attachDialogButtonListener();