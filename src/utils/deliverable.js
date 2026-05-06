
// Base class for a deliverable
class Deliverable {

    constructor(deliverableData) {
        for (const [key, value] of deliverableData.entries()) {
            this[key] = value;
        }
    }

    getName() {
        return this.project;
    }

    getDescription() {
        return this.description;
    }

    getDueDate() {
        return this.dueDate;
    }

    getPriority() {
        return this.priority;
    }

    getListableItem() {
        // Intentionally left empty
    }

}

export { Deliverable }