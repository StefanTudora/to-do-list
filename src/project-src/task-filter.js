
import { Project } from "./project.js";

class TaskFilter extends Project {

    // dueDate behaves now as a filtering paremeter

    constructor(deliverableName, dueDate) {
        super();
        this.deliverableName = deliverableName;
        this.dueDate = dueDate;
    }

    setTasks(taskList) {
        taskList.array.forEach(task => this.addTask(task));
    }

}

export { TaskFilter };