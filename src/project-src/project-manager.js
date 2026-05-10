import { Name } from "ajv";
import { setAddTaskBtnVisibility } from '../utils/ui-controller.js'
import { isEqual, isAfter, isBefore } from 'date-fns';
import { Project } from './project.js';
import { TaskFilter } from './task-filter.js';

/*
    Entity used mainly for handling the projects and their storage
*/

class ProjectManager {

    #projectList = [];
    #activeProject = undefined;

    constructor() {
        // Intentionally left empty
    }

    addProject(project) {
        this.addProjectEntryInMenu(project);
        this.#projectList.push(project);
    }

    addTaksToProject(task) {
        if (this.#activeProject !== undefined) {
            this.#activeProject.addTask(task);
            document.querySelector("#task-list-container > ul").appendChild(this.getDeliverablePresentationCard(task));
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
                this.getAllTasksWithinDeadline(project.getDueDate()).forEach(task => project.addTask());
            }
            listContainer.appendChild(project.getProjectContentDiv());
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
        date.textContent = listable.getDueDate();

        const priority = document.createElement("p");
        priority.textContent = listable.getPriority();
        // text.textContent = listable.getDescription();

        card.appendChild(name);
        card.appendChild(text);
        card.appendChild(date);
        card.appendChild(priority);

        listElement.appendChild(card);
        return listElement;
    }

    getAllTasksWithinDeadline(dateFilter) {
        const filteredProjects = [];
        for (var project of this.#projectList) {
            if (project instanceof TaskFilter) {
                continue;
            }
            project.getTaskList().forEach(task => {
                if (isBefore(task.getDueDate(), dateFilter)) {
                    filteredProjects.push(project);
                }
            });
        }
        return filteredProjects;
    }

}

export { ProjectManager };