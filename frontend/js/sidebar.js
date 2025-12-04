const sidebar = document.getElementById("sidebar")
const sidebarToggle = document.getElementById("sidebar-toggle")
const projDropdown = document.getElementById("proj-dropdown");
const pages = document.getElementById("pages");

let sidebarState = {
        sidebarOpen: document.getElementById("sidebar").classList.contains("open"),
        projDropdown: document.getElementById("proj-dropdown").classList.contains("closed"),
    };

function updateSidebarState(sidebarState)  {
    sidebarState = {
        sidebarOpen: document.getElementById("sidebar").classList.contains("open"),
        projDropdown: projDropdownShouldOpen,
    };

    return sidebarState;
}





async function loadProjects() {
    try {
        const response = await fetch("http://localhost:5000/api/projects");
        const projects = await response.json();

        const dropdown = document.getElementById("proj-dropdown");

        projects.forEach(project => {
            const li = document.createElement("li");
            const a = document.createElement("a");

            li.classList.add("nav-item");
            li.style.padding = "0.5rem";


            a.textContent = project;
            a.href = "#";
            a.id = project;
            
            li.addEventListener("click", (e) => {
                e.preventDefault();
                document.getElementById("content-selection").classList.add("open")
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




function toggleSidebar() {
    if (sidebarState.sidebarOpen) {
        sidebarState.projDropdown = projDropdown.classList.contains("open")
        projDropdown.classList.remove("open");
    }
    else if (sidebarState.projDropdown) {
        projDropdown.classList.add("open");
    }
    
    sidebar.classList.toggle("open");
    sidebarToggle.classList.toggle("closed");
    document.getElementById("menu-bar").classList.toggle("closed");
    sidebarState = updateSidebarState();
}






// Event Listeners


// document.addEventListener("DOMContentLoaded", () => {
//     loadProjects();
// });



document.getElementById("proj-dropdown-toggle").addEventListener("click", (e) => {
    e.preventDefault();
    if (sidebarState.sidebarOpen) {
        projDropdown.classList.toggle("open");
        projDropdownShouldOpen = projDropdown.classList.contains("open");
        sidebarState = updateSidebarState();
    }
});



document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key.toLowerCase() === "b") {
        toggleSidebar();
    }
});

sidebarToggle.addEventListener("click", toggleSidebar);

pages.addEventListener("click", function () {
    document.getElementById("content-selection").querySelectorAll("li.selected").forEach(el => el.classList.remove("selected"));
    pages.classList.add("selected");
});
