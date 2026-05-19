
import { Project } from "./project.js";

class TaskFilter extends Project {

    #comparisonDate = undefined;

    constructor(deliverableName, dateCheckRunnable) {
        super();
        this.deliverableName = deliverableName;
        this.dateCheckRunnable = dateCheckRunnable;
        if (arguments.length > 2) {
            this.#comparisonDate = arguments[2];
        }
    }

    setTasks(taskList) {
        taskList.array.forEach(task => this.addTask(task));
    }

    isTaskInRange(date) {
        if (this.#comparisonDate !== undefined) {
            return this.dateCheckRunnable(date, this.#comparisonDate);
        }
        return this.dateCheckRunnable(date);
    }
}

export { TaskFilter };