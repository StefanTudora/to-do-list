
import { Deliverable } from '../utils/deliverable.js'

class Task extends Deliverable {

    constructor(deliverableData) {
        super(deliverableData);
    }

    getListableUIContainer() {
        const listElement = document.createElement("li");
        listElement.appendChild(document.createTextNode(this.project));
        return listElement;
    }

}

export { Task };