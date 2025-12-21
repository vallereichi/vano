const sidebar = document.querySelector("nav");
const resizer = document.getElementById("sidebar-resizer");

let dragging = false;
let sidebarWidth;

let sidebarState = {
    open: true,
    width: sidebarWidth,
    projectList: true,
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

    document.documentElement.style.setProperty("--sidebar-width", `calc(${sidebarWidth}px - 1rem)`);
});

document.addEventListener("mouseup", () => {
    dragging = false;
    document.body.style.userSelect = "auto";
});

function toggleSidebar() {
    if (sidebarState.open) {
        sidebarWidth = `calc(2rem + 24px)`;
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
    if (sidebarState.open && window.location.pathname == "/projects") {
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
    const button = event.target.closest(".options-button");
    
    if (!projectMenu || !button) return;
    
    projectMenu.classList.remove("hide");
    projectMenu.addEventListener("mouseleave", () => {
        projectMenu.classList.add("hide");
    })
    
    event.preventDefault();
    event.stopPropagation();
    
    activeProjectId = button.dataset.projectId;

    const rect = button.getBoundingClientRect();

    projectMenu.style.top = `${rect.top - 10}px`;
    projectMenu.style.left = `${rect.left + 0}px`;

    projectMenu.hidden = false;
})

document.getElementById("delete-project").addEventListener("click", (event) => {
    event.preventDefault();
    if (activeProjectId) window.location.href = `/projects/${activeProjectId}/delete`;
})

