
import { format, parseISO } from 'date-fns';

// Base class for a deliverable
class Deliverable {

    // Used in date comparisons for date filtering deliverables
    #dateObj = undefined;

    constructor(deliverableData) {
        for (const [key, value] of deliverableData.entries()) {
            this[key] = value;
        }
        this.#dateObj = parseISO(this.getDueDate());
        this.dueDate = format(this.#dateObj, 'EEEE, do MMMM yyyy');
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

    // Used in comparisons for date filtered projects
    getParsedDateObj() {
        return this.#dateObj;
    }
}

export { Deliverable }