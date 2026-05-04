
import { Task } from '../task-src/task.js'
import { Deliverable } from '../utils/deliverable.js'

class Project extends Deliverable {

    // List of current task for the Project
    #taskList = {};

    constructor(name, description, dueDate, priority) {
        super(name, description, dueDate, priority);
    }

    static attachProjectCreateListener() {
        document.querySelector("#add-project-btn").addEventListener("click", () => {
            const dialog = document.querySelector("dialog");
            // Set type to diferentiate at instantiation of deliverable
            dialog.dataset.type = "project";
            dialog.showModal();
        });
    }

    getTaskList() {
        return this.#taskList;
    }

    clearTaskList() {
        this.#taskList = {};
    }

    getProjectContentDiv() {
        // Create parent container
        const projectUIContainer = document.createElement('div');
        for (let task in taskList) {
            // Get the task container
            const taskUIContainer = task.getUIContainer();
            projectUIContainer.appendChild(taskUIContainer);
        } 
    }
}


export { Project };