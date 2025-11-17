const sidebar = document.getElementById("sidebar")
const projToggle = document.getElementById("proj-dropdown-toggle");
const projDropdown = document.getElementById("proj-dropdown");
const projSelection = document.getElementById("project-selection")
const menuBar = document.getElementById("menu-bar")

async function loadProjects() {
    try {
        const response = await fetch("http://localhost:5000/api/projects");
        const projects = await response.json();

        const dropdown = document.getElementById("proj-dropdown");

        projects.forEach(project => {
            const li = document.createElement("li");
            const a = document.createElement("a");

            a.textContent = project;
            a.href = "#";
            a.id = project;
            
            li.addEventListener("click", (e) => {
                e.preventDefault();
                projSelection.classList.add("open")
                projDropdown.querySelectorAll("li.selected").forEach(el => el.classList.remove("selected"));
                li.classList.add("selected")
            })

            li.appendChild(a);
            dropdown.appendChild(li);

        });
    } catch (err) {
        console.error("Error loading projects:", err);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    loadProjects();
});



projToggle.addEventListener("click", (e) => {
    e.preventDefault();
    projDropdown.classList.toggle("open");
});

let projDropdownShouldOpen = false;
const sidebarToggle = document.getElementById("sidebar-toggle")

function toggleSidebar() {
    console.log(projDropdownShouldOpen)
    if (projDropdown.classList.contains("open")) {
        projDropdown.classList.toggle("open");
        projDropdownShouldOpen = true;
    }
    else if (projDropdownShouldOpen && !sidebar.classList.contains("open")) {
        projDropdown.classList.toggle("open");
    }


    sidebar.classList.toggle("open");
    menuBar.classList.toggle("closed");
    sidebarToggle.classList.toggle("closed");
}

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key.toLowerCase() === "b") {
        toggleSidebar();
    }
});

sidebarToggle.addEventListener("click", toggleSidebar);
