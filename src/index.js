
import './style.css';

import { Task } from './task-src/task.js';
import { Project } from './project-src/project.js';
import { ProjectManager } from './project-src/project-manager.js';
import { TaskFilter } from './project-src/task-filter.js';
import { addDays, addWeeks, format } from 'date-fns';

const projectManager = new ProjectManager();

projectManager.setBtnVisibility(false);

function attachDialogButtonListener() {

    addBaseProjects();
    attachCreateDeliverableListeners()

    const dialog = document.querySelector("dialog");
    const form = document.querySelector('form');

    document.querySelector("#close-btn").addEventListener("click", (event) => {
        event.preventDefault();
        form.reset();
        dialog.close();
    });

    document.querySelector("#submit-btn").addEventListener("click", (event) => {

        event.preventDefault();
        const type = dialog.dataset.type;
        const data = new Map(new FormData(form));

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

    const today = new Date();

    const todayPrj = new TaskFilter('Today', format(today, 'do MMMM yyyy'));
    const tommorowPrj = new TaskFilter('Tomorrow', format(addDays(today, 1), 'do MMMM yyyy'));
    const weekPrj = new TaskFilter('This week', format(addWeeks(today, 1), 'do MMMM yyyy'));

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

attachDialogButtonListener();
