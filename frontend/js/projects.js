async function handleCreateProject(event) {

    if (event) event.preventDefault();

    const projectName = "test project";

    try {
        const response = await fetch("http://127.0.0.1:5000/api/create-project", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({project_name: projectName}),
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Success:", result);
            alert(`Created Project ID: ${result.project_id}`);
            // You can now reload the page or redirect the user
        } else {
            console.error("Error:", result.error);
        }
    } catch (error) {
        console.error("Network error:", error);
    }
};

function openProjectCreationForm() {
    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");


    const form = document.createElement("form");
    form.classList.add("input-form");
    form.innerHTML = `
        <label for="input-proj-name">Create a new project</label>
        <div>
            <input type="text" name="input-proj-name" id="input-proj-name" placeholder="insert the project name" required>
            <button type="submit" id="create-proj-btn">Create</button>
        </div>
        `;

    backdrop.appendChild(form);
    document.body.appendChild(backdrop);

    backdrop.addEventListener("click", backdrop.remove);
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") backdrop.remove();
    })

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        handleCreateProject();
        backdrop.remove();
    });
}



const addProjBtn = document.getElementById("add-project");
addProjBtn.addEventListener("click", openProjectCreationForm);

