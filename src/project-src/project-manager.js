import { setAddTaskBtnVisibility } from '../utils/ui-controller.js'
import { Project } from './project.js';
import { TaskFilter } from './task-filter.js';
import { format } from 'date-fns';

class ProjectManager {

    #projectList = [];
    #activeProject = undefined;

    constructor() {
        // Intentionally left empty
    }

    addProject(project) {
        this.addProjectEntryInMenu(project);
        this.#projectList.push(project);
        localStorage.setItem(project.getDeliverableName(), project);
    }

    addTaksToProject(task) {
        if (this.#activeProject !== undefined) {
            this.#activeProject.addTask(task);
            document.querySelector("#task-list-container > ul").appendChild(this.getDeliverablePresentationCard(task));
            // Update the storage for the project
            localStorage.setItem(this.#activeProject.getDeliverableName(), this.#activeProject);
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

        const card = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = listable.getDeliverableName();

        const text = document.createElement("p");
        text.textContent = listable.getDescription();

        const date = document.createElement("p");
        date.textContent = format(listable.getDueDate(), 'do MMMM yyyy');

        const priority = document.createElement("p");
        priority.textContent = listable.getPriority();

        card.appendChild(name);
        card.appendChild(text);
        card.appendChild(date);
        card.appendChild(priority);

        listElement.appendChild(card);
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