import { setAddTaskBtnVisibility } from '../utils/ui-controller.js'
import { TaskFilter } from './task-filter.js';
import { Project } from './project.js';
import { format } from 'date-fns';

class ProjectManager {

    #projectList = [];
    #activeProject = undefined;

    addProject(...projects) {
        for (const project of projects) {
            this.addProjectEntryInMenu(project);
            this.#projectList.push(project);
            if (project instanceof TaskFilter) {
                continue;
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

            listContainer.appendChild(this.getTitleCard(project.getDeliverableName()));
            listContainer.appendChild(this.getProjectContentDiv(project));
        });
        listItem.appendChild(button);
        return listItem;
    }

    getTitleCard(projectName) {
        const titleDiv = document.createElement("div");
        titleDiv.innerHTML = `
            <h3>${projectName}<h3>
        `;
        return titleDiv;
    }

    addProjectEntryInMenu(listable) {
        const menuContainer = document.querySelector("nav > #menu");
        menuContainer.appendChild(this.getListableItem(listable));
    }

    getDeliverablePresentationCard(listable) {

        const UUID = crypto.randomUUID();
        const listElement = document.createElement("li");
        listElement.innerHTML = `
            <div class="task-card">
                <h3>${listable.getDeliverableName()}</h3>
                <p>${listable.getDescription()}</p>
                <p>Due Date: ${format(listable.getDueDate(), 'do MMMM yyyy')}</p>
                <p p-class="${listable.getPriority()}" class="priority">${listable.getPriority()}</p>
            </div>
            <hr style="width: 100%;">
            <div class="task-controls">
                <div>
                    <input type="checkbox" id="${UUID}">
                    <label for="${UUID}">Done</label>
                </div>
                <button>Edit task</button>
            </div>
        `;
        return listElement;
    }

    getProjectContentDiv(project) {
        const projectUIContainer = document.createElement('ul');
        projectUIContainer.setAttribute("id", project.getDeliverableName());
        project.getTaskList().forEach(task => {
            const taskUIContainer = this.getDeliverablePresentationCard(task);
            projectUIContainer.appendChild(taskUIContainer);
        });
        return projectUIContainer;
    }

    // Create a textbox for the navbar where the user inputs his project
    createEditableProjectEntry() {
        const listItem = document.createElement("li");
        const editable = document.createElement("input");
        const menu = document.querySelector("nav > #menu");
        const projectManagerRef = this;

        editable.addEventListener("keypress", function (event) {
            if (event.key == 'Enter') {
                const projectName = editable.value;
                if (projectName !== "") {
                    editable.parentElement.removeChild(editable);
                    const project = new Project(new Map([
                        ['deliverableName', projectName]
                    ]));
                    projectManagerRef.addProject(project);
                }
            }
        });

        listItem.appendChild(editable);
        menu.appendChild(listItem);
        editable.focus();
    }
}

export { ProjectManager };