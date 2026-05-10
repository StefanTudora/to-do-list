
import { Task } from '../task-src/task.js'
import { Deliverable } from '../utils/deliverable.js'

// TODO -> split the project/task classes in UI and Model, don't have a single class handling the entire logic

class Project extends Deliverable {

    // List of current task for the Project
    #taskList = [];

    constructor(deliverableData) {
        super(deliverableData);
    }

    addTask(task) {
        this.#taskList.push(task);
    }

    getTaskList() {
        return this.#taskList;
    }

    clearTaskList() {
        this.#taskList = [];
    }
}


export { Project };