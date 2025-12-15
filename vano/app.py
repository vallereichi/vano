from flask import Flask
from flask import request, url_for, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/projects")
def list_projects():
    projects = ["Project A", "Project B", "Project C"]
    return render_template("projects.html", projects=projects)

@app.route("/projects/add", methods=["GET", "POST"])
def add_project():
    if request.method == "POST":
        project_name = request.form.get("project_name")
        # Here you would normally save the project to a database
        return f"Project '{project_name}' added successfully!"
    return render_template("add_project.html")


if __name__ == "__main__":
    app.run(debug=True)