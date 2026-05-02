
function attachProjectCreateListeners() {
    const addProjectButton = document.querySelector("#add-project-btn");
    addProjectButton.addEventListener("click", () => {
        const dialog = document.querySelector("dialog");
        dialog.showModal();
    });
}

export {attachProjectCreateListeners};