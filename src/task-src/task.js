
import { Deliverable } from '../utils/deliverable.js'

class Task extends Deliverable {

    constructor(deliverableData) {
        super(deliverableData);
        this.checkedProperty = false;
    }

    getListableUIContainer() {
        const listElement = document.createElement("li");
        listElement.appendChild(document.createTextNode(this.project));
        return listElement;
    }
}

export { Task };