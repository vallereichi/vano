from flask import Flask, jsonify, request
from flask_cors import CORS
from database import init_database, create_project


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

init_database()


@app.route("/api/create-project", methods=['POST'])
def create_project_route():
    # retrieve the project name from the frontend
    data = request.get_json()
    project_name = data.get("project_name")

    if not project_name:
        return jsonify({"error": "Project name is required"}), 400
    
    # create new project
    new_project_id = create_project(project_name)

    # return response
    if new_project_id:
        return jsonify({
            "message": "Project created successfully",
            "project_id": new_project_id,
            "project_name": project_name
        }), 201
    else:
        return jsonify({"error": "Failed to create project"}), 500  




    

if __name__ == '__main__':
    app.run(port=5000, debug=True)