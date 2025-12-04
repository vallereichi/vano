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

const addProjBtn = document.getElementById("add-project");
addProjBtn.addEventListener("click", handleCreateProject);