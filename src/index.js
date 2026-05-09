
import './style.css';

import { Project } from './project-src/project.js';
import { Task } from './task-src/task.js';
import { ProjectManager } from './project-src/project-manager.js';

const projectManager = new ProjectManager();

projectManager.setBtnVisibility(false);

function attachDialogButtonListener() {

    attachCreateDeliverableListeners()

    const dialog = document.querySelector("dialog");
    const from = document.querySelector('form')

    document.querySelector("#close-btn").addEventListener("click", (event) => {
        event.preventDefault();
        from.reset();
        dialog.close();
    });

    document.querySelector("#submit-btn").addEventListener("click", (event) => {

        event.preventDefault();
        const type = dialog.dataset.type;
        const data = new FormData(from);

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
        from.reset();
        dialog.close();
    });
}

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
