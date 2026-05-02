
import './style.css'
import {attachProjectCreateListeners} from './project-src/project.js';
import {attachTaskCreateListeners} from './task-src/task.js';

attachTaskCreateListeners();

attachProjectCreateListeners();

function attachDialogButtonListener() {

    const dialog = document.querySelector("dialog");
    const closeButton = dialog.querySelector("dialog #close-btn");
    const submitButton = dialog.querySelector("dialog #submit-btn");
    closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        dialog.close();
    });

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const form = document.querySelector("form");
        // Add project/task creation logic here
        form.reset();
        dialog.close();
    });
}

attachDialogButtonListener();