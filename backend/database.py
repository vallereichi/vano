import sqlite3

DB_PATH = "database.db"

def init_database():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    c.execute("""
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project TEXT NOT NULL,
            parent_id INTEGER,
            name TEXT NOT NULL,
            is_folder INTEGER NOT NULL,
            content TEXT,
            FOREIGN KEY (parent_id) REFERENCES projects(id)
        );
    """)

    conn.commit()
    conn.close()
    print("Database initialised")


def create_project(project_name):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # Create project root node
    c.execute("""
        INSERT INTO projects (project, parent_id, name, is_folder, content)
        VALUES (?, NULL, ?, 1, NULL)
    """, (project_name, project_name))
    
    root_id = c.lastrowid

    # 1) Create notes.md as a file
    c.execute("""
        INSERT INTO projects (project, parent_id, name, is_folder, content)
        VALUES (?, ?, ?, 0, ?)
    """, (project_name, root_id, "notes.md", ""))  # empty file

    # 2) Create pages and cards as folders
    for folder in ["pages", "cards"]:
        c.execute("""
            INSERT INTO projects (project, parent_id, name, is_folder, content)
            VALUES (?, ?, ?, 1, NULL)
        """, (project_name, root_id, folder))

    conn.commit()
    conn.close()

    print(f"Project '{project_name}' created with notes.md, pages/, cards/")
    return root_id


if __name__ == "__main__":
    init_database()