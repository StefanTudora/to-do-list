
class Deliverable {

    constructor(deliverableData) {
        if (deliverableData !== undefined) {
            for (const [key, value] of deliverableData) {
                this[key] = value;
            }
        }
    }

    getDeliverableName() {
        return this.deliverableName;
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
}

export { Deliverable }