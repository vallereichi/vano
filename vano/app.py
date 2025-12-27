from flask import Flask
from flask import request, url_for, render_template, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, String, Text, DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from datetime import datetime

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

app = Flask(__name__)
app.secret_key = b"SuperSecret"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"

db.init_app(app)


class Project(db.Model):
    project_id: Mapped[int] = mapped_column(primary_key=True)
    project_name: Mapped[str] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)


with app.app_context():
    db.create_all()


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/projects")
def list_projects():
    projects = db.session.execute(db.select(Project).order_by(Project.created_at)).scalars()
    return render_template("projects.html", projects=projects)

@app.route("/projects/add", methods=["GET", "POST"])
def add_project():
    projects = db.session.execute(db.select(Project).order_by(Project.created_at)).scalars()

    if request.method == "POST":
        project = Project(project_name = request.form["input-proj-name"])

        try:
            db.session.add(project)
            db.session.commit()
            return redirect(url_for("list_projects"))
        except Exception as e:
            db.session.rollback()
            flash(f"Error adding project: {e}", "error")

    return render_template("add_project.html", projects=projects)

@app.route("/projects/<int:project_id>/delete")
def delete_project(project_id):
    project = db.session.get(Project, project_id)
    if project:
        db.session.delete(project)
        db.session.commit()
        return redirect(url_for("list_projects"))
    return "Project not found", 404

@app.route("/projects/<int:project_id>")
def view_project(project_id):
    project = db.session.get(Project, project_id)
    if project:
        projects = db.session.execute(db.select(Project).order_by(Project.created_at)).scalars()
        return render_template("project_id.html", project=project, projects=projects)
    return "Project not found", 404


if __name__ == "__main__":
    app.run(debug=True)