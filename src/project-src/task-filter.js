
import { Project } from "./project.js";

class TaskFilter extends Project {

    // dueDate behaves now as a filtering paremeter

    constructor(deliverableName, dateCheckRunnable) {
        super();
        this.deliverableName = deliverableName;
        this.dateCheckRunnable = dateCheckRunnable;
    }

    setTasks(taskList) {
        taskList.array.forEach(task => this.addTask(task));
    }

    isTaskInRange(date) {
        return this.dateCheckRunnable(date);
    }
}

export { TaskFilter };