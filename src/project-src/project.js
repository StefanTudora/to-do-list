
import { Deliverable } from '../utils/deliverable.js'

class Project extends Deliverable {

    // List of current task for the Project
    #taskList = [];

    constructor(deliverableData) {
        super(deliverableData);
    }

    addTask(delioverable) {
        this.#taskList.push(delioverable);
    }

    getTaskList() {
        return this.#taskList;
    }

    clearTaskList() {
        this.#taskList = [];
    }
}

export { Project };