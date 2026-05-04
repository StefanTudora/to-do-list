
import './style.css';

import { Project } from './project-src/project.js';
import { Task } from './task-src/task.js';

function attachDialogButtonListener() {

    Project.attachProjectCreateListener();
    
    Task.attachTaskCreateListeners();

    const dialog = document.querySelector("dialog");

    document.querySelector("#close-btn").addEventListener("click", (event) => {
        event.preventDefault();
        dialog.close();
    });

    document.querySelector("#submit-btn").addEventListener("click", (event) => {
        
        event.preventDefault();
        const type = dialog.dataset.type;
        const data = Object.fromEntries(new FormData(document.querySelector('form')));

        console.log(data);

        switch(type) {
            case "project":
                // Create a project here;
                
                // var project = new Project();
                break;
            case "task":
                // var task = new Task();
                // Create a task here;
                break;
        }
        dialog.close();
    });
}

function addProjectEntry(projectName) {
    const menu = document.querySelector(".menu");
    menu.appendChild(document.createElement("li").appendChild(document.createTextNode(projectName)));
}

attachDialogButtonListener();