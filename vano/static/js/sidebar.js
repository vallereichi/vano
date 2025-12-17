const sidebar = document.querySelector("nav");
const resizer = document.getElementById("sidebar-resizer");

let dragging = false;
let sidebarWidth;

let sidebarState = {
    open: true,
    width: sidebarWidth,
    projectList: false,
}

resizer.addEventListener("mousedown", (event) => {
    if (!sidebarState.open) return;

    event.preventDefault();
    dragging = true;
    document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (event) => {
    if (!dragging) return;

    sidebarWidth = event.clientX;
    sidebarWidth = Math.max(140, Math.min(sidebarWidth, 600));

    document.documentElement.style.setProperty("--sidebar-width", `calc(${sidebarWidth}px - 2rem)`);
});

document.addEventListener("mouseup", () => {
    dragging = false;
    document.body.style.userSelect = "auto";
});

function toggleSidebar() {
    if (sidebarState.open) {
        sidebarWidth = `calc(1rem + 24px)`;
        document.getElementById("settings-button").style.display = "none";
        resizer.style.display = "none";
        if (sidebarState.projectList) projectList.classList.toggle("hide");
        sidebarState.open = false;
    } 
    else {
        sidebarWidth = `10rem`;
        sidebarState.open = true;
        document.getElementById("settings-button").style.display = "flex";
        resizer.style.display = "block";
        if (sidebarState.projectList) projectList.classList.toggle("hide");
    }
    document.documentElement.style.setProperty("--sidebar-width", `${sidebarWidth}`);
    document.getElementById("sidebar-options").classList.toggle("closed");
};

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "b") toggleSidebar();
});

document.getElementById("sidebar-toggle").addEventListener("click", toggleSidebar);

const projectBtn = document.getElementById("project-button");
const projectList = document.getElementById("project-list")
projectBtn.addEventListener("mouseenter", () => {
    document.getElementById("add-project").style.display = "block";
})
projectBtn.addEventListener("mouseleave", () => {
    document.getElementById("add-project").style.display = "none";
})

projectBtn.addEventListener("click", (event) => {
    if (sidebarState.open && !projectList.classList.contains("hide")) {
        event.preventDefault();
        projectList.classList.toggle("hide");
        if (sidebarState.projectList) sidebarState.projectList = false;
        else sidebarState.projectList = true;
    }
})

document.getElementById("add-project").addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.location.href = "/projects/add";
})

const projectMenu = document.getElementById("project-menu");
let activeProjectId = null;

document.addEventListener("click", (event) => {
    console.log("activate")
    const button = event.target.closest(".options-button");

    if (!projectMenu) return;

    if (!button && !projectMenu.contains(event.target)) {
        projectMenu.hidden = true;
        return;
    }

    if (!button) return;

    event.preventDefault();
    event.stopPropagation();

    activeProjectId = button.dataset.projectId;

    const rect = button.getBoundingClientRect();

    projectMenu.style.top = `${rect.top}px`;
    projectMenu.style.left = `${rect.left + 8}px`;

    projectMenu.hidden = false;
})

