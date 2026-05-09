import { Name } from "ajv";
import { setAddTaskBtnVisibility } from '../utils/ui-controller.js'
import { isEqual, isAfter, isBefore } from 'date-fns';

/*
    Entity used mainly for handling the projects and their storage
*/

class ProjectManager {

    #projectMap = new Map();
    #perspectives = new Map();
    #activeProject = undefined;

    constructor() {
        // Intentionally left empty
    }

    addProject(project) {
        this.addProjectEntryInMenu(project);
        this.#projectMap.set(project.getName(), project);
    }

    addTaksToProject(task) {
        if (this.#activeProject !== undefined) {
            this.#activeProject.addTask(task);
            document.querySelector("#task-list-container > ul").appendChild(this.getDeliverablePresentationCard(task));
        }
    }

    setActiveProject(project) {
        this.#activeProject = project;
        this.setBtnVisibility(true);
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
        const projectName = project.getName();
        listItem.setAttribute("id", projectName);
        button.textContent = projectName;
        button.addEventListener("click", () => {
            this.setActiveProject(project);
            listContainer.replaceChildren();
            // if (this.#projectMap.get(project.getName()))
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
        name.textContent = listable.getName();

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
        projectMap.array.forEach((key, project) => {
            if (isBefore(project.getParsedDateObj(), dateFilter)) {
                filteredProjects.push(project);
            }
        });
        return filteredProjects;
    }

}

export { ProjectManager };