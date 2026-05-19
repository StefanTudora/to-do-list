
import { Deliverable } from '../utils/deliverable.js'

class Project extends Deliverable {

    // List of current task for the Project
    #taskList = [];

    constructor(deliverableData) {
        super(deliverableData);
    }

    addTask(deliverable) {
        this.#taskList.push(deliverable);
    }

    removeTask(deliverable) {
        this.#taskList = this.#taskList.filter(task => task !== deliverable);
    }

    getTaskList() {
        return this.#taskList;
    }

    clearTaskList() {
        this.#taskList = [];
    }

    toJSON() {
        return {
            deliverableName: this.deliverableName,
            taskList: this.#taskList
        };
    }
}

export { Project };