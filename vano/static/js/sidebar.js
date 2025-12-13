const sidebar = document.querySelector("nav");
const resizer = document.getElementById("sidebar-resizer");

let dragging = false;
let sidebarWidth;

let sidebarState = {
    open: true,
    width: sidebarWidth,
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
        sidebarState.open = false;
    } 
    else {
        sidebarWidth = `10rem`;
        sidebarState.open = true;
        document.getElementById("settings-button").style.display = "flex";
        resizer.style.display = "block";
    }
    document.documentElement.style.setProperty("--sidebar-width", `${sidebarWidth}`);
    document.getElementById("sidebar-options").classList.toggle("closed");
};

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "b") toggleSidebar();
});

document.getElementById("sidebar-toggle").addEventListener("click", toggleSidebar);

const projectBtn = document.getElementById("project-button");
projectBtn.addEventListener("mouseenter", () => {
    document.getElementById("add-project").style.display = "block";
})
projectBtn.addEventListener("mouseleave", () => {
    document.getElementById("add-project").style.display = "none";
})