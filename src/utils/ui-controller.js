
/*
    Class responsible for the UI creation
*/


function attachCreateDeliverableListeners() {
    const typeList = ["project", "task"];
    document.querySelectorAll(".create-btn").forEach((btn, idx) => {
        btn.addEventListener("click", () => {
            const dialog = document.querySelector("dialog");
            // Set type to diferentiate at instantiation of deliverable
            dialog.dataset.type = typeList[idx];
            dialog.showModal();
        });
    });
}

function setAddTaskBtnVisibility(state) {
    const button = document.querySelector(".task-content > .controls  button");
    if (state) {
        button.hidden = false;
    } else {
        button.hidden = true;
    }
}

export { setAddTaskBtnVisibility };