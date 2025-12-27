// CONSTANTS AND VARIABLES

const sidebar = document.querySelector("nav");
const resizer = document.getElementById("sidebar-resizer");

const projectBtn = document.getElementById("project-button");
const projectList = document.getElementById("project-list");
const addProjectBtn = document.getElementById("add-project");
const projectMenu = document.getElementById("project-menu");

let sidebarWidth;
let activeProjectId = null;

let sidebarState = {
    open: true,
    width: sidebarWidth,
    projectList: true,
}

// EVENT LISTENERS

// drag sidebar
resizer.addEventListener("mousedown", (event) => {
    event.preventDefault();
    dragSidebar();
});

// toggle sidebar
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "b") toggleSidebar();
});
document.getElementById("sidebar-toggle").addEventListener("click", toggleSidebar);

// toggle project list
projectBtn.addEventListener("click", (event) => {
    if (sidebarState.open && window.location.pathname == "/projects") {
        event.preventDefault();
        projectList.classList.toggle("hide");
        if (sidebarState.projectList) sidebarState.projectList = false;
        else sidebarState.projectList = true;
    }
})

// add a new project
addProjectBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.location.href = "/projects/add";
})

// delete a project
document.getElementById("delete-project").addEventListener("click", (event) => {
    event.preventDefault();
    if (activeProjectId) window.location.href = `/projects/${activeProjectId}/delete`;
})

// show project menu
document.addEventListener("click", (event) => {
    showMenu(event);
})


// FUNCTIONS

function dragSidebar() {
    if (!sidebarState.open) return;

    // start dragging
    let dragging = true;

    // prevent the default browser selection behaviour
    document.body.style.userSelect = "none";

    // listen for mousemove events and set the sidebar width according to the mouse position
    document.addEventListener("mousemove", (event) => {

        if (!dragging) return;  

        sidebarWidth = event.clientX;
        sidebarWidth = Math.max(140, Math.min(sidebarWidth, 600));

        document.documentElement.style.setProperty("--sidebar-width", `calc(${sidebarWidth}px - 1rem)`);
    });

    // stop dragging when the mouse is released
    document.addEventListener("mouseup", () => {
        dragging = false;
        document.body.style.userSelect = "auto";
    });
};

function toggleSidebar() {

    if (sidebarState.open) {
        // set the sidebar width to its closed value
        sidebarWidth = `calc(2rem + 24px)`;

        document.getElementById("settings-button").style.display = "none";
        resizer.style.display = "none";

        // hide the project list if it's open
        if (sidebarState.projectList) projectList.classList.toggle("hide");
        sidebarState.open = false;
    } 
    else {
        // set the sidebar width to its open value
        sidebarWidth = `10rem`;
        sidebarState.open = true;

        document.getElementById("settings-button").style.display = "flex";
        resizer.style.display = "block";

        // show the project list if it was open before
        if (sidebarState.projectList) projectList.classList.toggle("hide");
    }
    document.documentElement.style.setProperty("--sidebar-width", `${sidebarWidth}`);
    document.getElementById("sidebar-options").classList.toggle("closed");
};


function showMenu(event) {

    // select the closest options button
    const button = event.target.closest(".options-button");

    // if there's no button or menu, exit
    if (!projectMenu || !button) return;
    
    // display the menu as long as the mouse is over it
    projectMenu.classList.remove("hide");
    projectMenu.addEventListener("mouseleave", () => {
        projectMenu.classList.add("hide");
    })
    
    event.preventDefault();
    event.stopPropagation();
    
    // retrieve the project ID from the button's data attribute
    activeProjectId = button.dataset.projectId;

    // set the menu position based on the selected button
    const rect = button.getBoundingClientRect();

    projectMenu.style.top = `${rect.top - 8}px`;
    projectMenu.style.left = `calc(${rect.left}px + ${rect.width}px + 0.5rem)`;

    projectMenu.hidden = false;

}






