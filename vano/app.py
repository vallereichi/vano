from flask import Flask
from flask import request, url_for, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, String, Text, DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from datetime import datetime

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

app = Flask(__name__)
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
    if request.method == "POST":
        project = Project(project_name = request.form["input-proj-name"])
        db.session.add(project)
        db.session.commit()
        return redirect(url_for("list_projects"))
    return render_template("add_project.html")


if __name__ == "__main__":
    app.run(debug=True)