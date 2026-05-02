
function attachTaskCreateListeners() {
    const addTaskButton = document.querySelector("#add-task-btn");
    addTaskButton.addEventListener("click", () => {
        const dialog = document.querySelector("dialog");
        dialog.showModal();
    });
}

export {attachTaskCreateListeners};