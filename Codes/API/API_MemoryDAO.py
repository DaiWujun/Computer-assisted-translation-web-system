import os

import mysql.connector
from flask import Flask, jsonify, request
from MemoryLibraryDAO import MemoryLibraryDAO

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False


@app.route('/projects', methods=['GET'])

def get_all_projects():
    dao = MemoryLibraryDAO()
    projects = dao.get_all_projects()
    return jsonify(projects)


@app.route('/projects/search', methods=['GET'])

def search_projects():
    search_term = request.args.get('q')
    dao = MemoryLibraryDAO()
    projects = dao.search_projects(search_term)
    return jsonify(projects)


@app.route('/projects', methods=['POST'])

def add_project():
    project_name = request.json['project_name']
    project_content = request.json['project_content']
    dao = MemoryLibraryDAO()
    dao.add_project(project_name, project_content)
    return jsonify({'message': 'Project added successfully'}), 201


@app.route('/projects/<int:project_id>', methods=['DELETE'])

def delete_project(project_id):
    dao = MemoryLibraryDAO()
    dao.delete_project(project_id)
    return jsonify({'message': 'Project deleted successfully'})


@app.route('/projects/<int:project_id>', methods=['PUT'])

def update_project(project_id):
    project_name = request.json['project_name']
    project_content = request.json['project_content']
    dao = MemoryLibraryDAO()
    dao.update_project(project_id, project_name, project_content)
    return jsonify({'message': 'Project updated successfully'})


@app.route('/projects/export', methods=['GET'])

def export_backup():
    folder_path = 'backup_folder'  # 指定备份文件夹路径
    dao = MemoryLibraryDAO()
    dao.export_backup(folder_path)
    return jsonify({'message': 'Backup exported successfully'})


@app.route('/projects/import', methods=['POST'])

def import_backup():
    backup_file = request.files['backup_file']
    backup_file.save('imported_backup.zip')  # 保存上传的备份文件
    backup_file_path = 'imported_backup.zip'  # 指定导入的备份文件路径
    dao = MemoryLibraryDAO()
    dao.import_backup(backup_file_path)
    return jsonify({'message': 'Backup imported successfully'})


if __name__ == '__main__':
    app.run()