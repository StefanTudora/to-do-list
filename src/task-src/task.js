
import { Deliverable } from '../utils/deliverable.js'

class Task extends Deliverable {

    constructor(name, description, dueDate, priority) {
        super(name, description, dueDate, priority);
    }

    static attachTaskCreateListeners() {
        document.querySelector("#add-task-btn").addEventListener("click", () => {
            const dialog = document.querySelector("dialog");
            // Set type to diferentiate at instantiation of deliverable
            dialog.showModal();
        });
    }

    getUIContainer() {
        return null;
    }

}

export {Task};