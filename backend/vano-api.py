from flask import Flask, jsonify, send_file
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

PROJECT_ROOT = './projects'

@app.route('/api/projects')
def list_projects():
    try:
        projects = [d for d in os.listdir(PROJECT_ROOT) if os.path.isdir(os.path.join(PROJECT_ROOT, d))]
        return jsonify(projects)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/projects/<procect_name>/pages')
def list_pages(procect_name):
    try:
        project_path = os.path.join(PROJECT_ROOT, procect_name)
        pages = [f for f in os.listdir(project_path + '/pages') if os.path.isfile(os.path.join(project_path, 'pages', f))]
        return jsonify(pages)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/projects/<project_name>/pages/<page_name>')
def get_page_content(project_name, page_name):
    try:
        page_path = os.path.join(PROJECT_ROOT, project_name, "pages", page_name)
        with open(page_path, 'r') as file:
            content = file.read()
        return jsonify({"content": content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

if __name__ == '__main__':
    app.run(port=5000, debug=True)