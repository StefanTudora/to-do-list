
import { Deliverable } from '../utils/deliverable.js'
import { Task } from '../task-src/task.js'

class Project extends Deliverable {

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

    static fromJSON(jsonData) {
        const parsed = JSON.parse(jsonData);
        const project = new Project(new Map(Object.entries({
            deliverableName: parsed.deliverableName,
            description: parsed.description,
            dueDate: parsed.dueDate,
            priority: parsed.priority
        })));
        if (parsed.taskList && Array.isArray(parsed.taskList)) {
            parsed.taskList.forEach(taskData => {
                const task = new Task(new Map(Object.entries(taskData)));
                task.checkedProperty = taskData.checkedProperty;
                project.addTask(task);
            });
        }
        return project;
    }
}

export { Project };