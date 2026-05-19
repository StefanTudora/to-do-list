
/*
    Class responsible for the UI creation
*/

function setAddTaskBtnVisibility(state) {
    const button = document.querySelector(".task-content > .controls  button");
    if (state) {
        button.hidden = false;
    } else {
        button.hidden = true;
    }
}

export { setAddTaskBtnVisibility };