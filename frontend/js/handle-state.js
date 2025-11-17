function saveState() {
    const state = {
        sidebarOpen: document.getElementById("sidebar").classList.contains("open"),
        projDropdown: projDropdownShouldOpen,
        editorText: document.getElementById("editor").value,
        contentText: document.getElementById("content").innerHTML,
        scroll: window.scrollY
    };

    localStorage.setItem("pageState", JSON.stringify(state));
}


function loadState() {
    if (!localStorage.getItem("pageState")) return;

    const state = JSON.parse(localStorage.getItem("pageState"));

    projDropdownShouldOpen = state.projDropdown;
    if (!state.sidebarOpen) toggleSidebar();
    if (state.sidebarOpen && projDropdownShouldOpen) document.getElementById("proj-dropdown").classList.toggle("open");
    if (state.editorText) document.getElementById("editor").value = state.editorText;
    if (state.contentText) document.getElementById("content").innerHTML = state.contentText;
    if (state.scroll) window.scrollTo(0, state.scroll);
}







window.addEventListener("beforeunload", () => {    
    saveState();
});
window.addEventListener("DOMContentLoaded", () => {
        loadState();
});