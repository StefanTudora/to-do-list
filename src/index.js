
import './style.css';

import { Task } from './task-src/task.js';
import { Project } from './project-src/project.js';
import { ProjectManager } from './project-src/project-manager.js';
import { TaskFilter } from './project-src/task-filter.js';
import { isToday, isTomorrow, isThisWeek } from 'date-fns';

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
        const type = dialog.dataset.type;
        const data = (new FormData(form)).entries();

        switch (type) {
            case "project":
                var project = new Project(data);
                projectManager.addProject(project);
                break;
            case "task":
                var task = new Task(data);
                projectManager.addTaksToProject(task);
                break;
        }
        form.reset();
        dialog.close();
    });
}

function addBaseProjects() {

    const todayPrj = new TaskFilter('Today', isToday);
    const tommorowPrj = new TaskFilter('Tomorrow', isTomorrow);
    const weekPrj = new TaskFilter('This week', isThisWeek);

    projectManager.addProject(todayPrj);
    projectManager.addProject(tommorowPrj);
    projectManager.addProject(weekPrj);
}

// TODO -> move into the ui-controller class
function attachCreateDeliverableListeners() {
    const typeList = ["project", "task"];
    document.querySelectorAll(".create-btn").forEach((btn, idx) => {
        btn.addEventListener("click", () => {
            const dialog = document.querySelector("dialog");
            // Set type to diferentiate at instantiation of deliverable
            dialog.dataset.type = typeList[idx];
            dialog.showModal();
        });
    });
}

function loadFromStorage() {
    if (localStorage.length === 0) {
        return;
    }
    Object.keys(localStorage).forEach(function (key) {
        projectManager.addProject(new Project(Object.entries(JSON.parse(localStorage.getItem(key)))));
    });
}

attachDialogButtonListener();