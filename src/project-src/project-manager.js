import { setAddTaskBtnVisibility } from '../utils/ui-controller.js'
import { TaskFilter } from './task-filter.js';
import { format } from 'date-fns';

class ProjectManager {

    #projectList = [];
    #activeProject = undefined;

    constructor() {
        // Intentionally left empty
    }

    addProject(...projects) {
        for (const project of projects) {
            this.addProjectEntryInMenu(project);
            this.#projectList.push(project);
            if (project instanceof TaskFilter) {
                return;
            }
            localStorage.setItem(project.getDeliverableName(), JSON.stringify(project));
        }
    }

    addTaksToProject(task) {
        if (this.#activeProject !== undefined) {
            this.#activeProject.addTask(task);
            document.querySelector("#task-list-container > ul").appendChild(this.getDeliverablePresentationCard(task));
            // Update the storage for the project
            localStorage.setItem(this.#activeProject.getDeliverableName(), JSON.stringify(this.#activeProject));
        }
    }

    setActiveProject(project) {
        this.#activeProject = project;
        this.setBtnVisibility((project instanceof TaskFilter) ? false : true);
    }

    setBtnVisibility(state) {
        setAddTaskBtnVisibility(state);
    }

    getActiveProject() {
        return this.#activeProject;
    }

    // Set entry in menu, but also make sure to add active perspective listener
    getListableItem(project) {
        const listItem = document.createElement("li"), button = document.createElement("button"),
            listContainer = document.querySelector("#task-list-container");
        console.log(project.deliverableName);
        const projectName = project.getDeliverableName();
        button.textContent = projectName;
        button.addEventListener("click", () => {
            this.setActiveProject(project);
            listContainer.replaceChildren();
            if (project instanceof TaskFilter) {
                project.clearTaskList();
                this.#projectList.filter(currPrj => !(currPrj instanceof TaskFilter)).forEach(currPrj => {
                    currPrj.getTaskList().forEach(task => {
                        if (project.isTaskInRange(task.getDueDate())) {
                            project.addTask(task);
                        }
                    });
                });
            }
            listContainer.appendChild(this.getProjectContentDiv(project));
        });
        listItem.appendChild(button);
        return listItem;
    }

    // Add the 
    addProjectEntryInMenu(listable) {
        const menuContainer = document.querySelector("nav > #menu");
        menuContainer.appendChild(this.getListableItem(listable));
    }

    getDeliverablePresentationCard(listable) {

        const listElement = document.createElement("li");

        listElement.innerHTML = `
            <div class="task-card">
                <h3>${listable.getDeliverableName()}</h3>
                <p>${listable.getDescription()}</p>
                <p>${format(listable.getDueDate(), 'do MMMM yyyy')}</p>
                <p>${listable.getPriority()}</p>
            </div>
        `;

        return listElement;
    }

    getProjectContentDiv(project) {
        // Create parent container
        const projectUIContainer = document.createElement('ul');
        projectUIContainer.setAttribute("id", project.getDeliverableName());
        project.getTaskList().forEach(task => {
            // Get the task container
            const taskUIContainer = this.getDeliverablePresentationCard(task);
            projectUIContainer.appendChild(taskUIContainer);
        });
        return projectUIContainer;
    }

}

export { ProjectManager };