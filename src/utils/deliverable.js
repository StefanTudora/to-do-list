
import { format, parseISO } from 'date-fns';

// Base class for a deliverable
class Deliverable {

    // Used in date comparisons for date filtering deliverables
    #dateObj = undefined;

    constructor(deliverableData) {
        if (deliverableData !== undefined) {
            for (const [key, value] of deliverableData) {
                this[key] = value;
            }
            this.#dateObj = parseISO(this.getDueDate());
            this.dueDate = format(this.#dateObj, 'do MMMM yyyy');
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

    // Used in comparisons for date filtered projects
    getParsedDateObj() {
        return this.#dateObj;
    }
}

export { Deliverable }