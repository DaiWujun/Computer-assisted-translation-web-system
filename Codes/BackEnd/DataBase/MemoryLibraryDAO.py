
class MemoryLibraryDAO:
    def __init__(self):
        self.cnx = mysql.connector.connect(
            host="localhost",
            user="your_username",
            password="your_password",
            database="your_database"
        )
    
    def __del__(self):
        self.cnx.close()
    
    def get_all_projects(self):
        cursor = self.cnx.cursor()
        get_all_projects_query = "SELECT * FROM Projects"
        cursor.execute(get_all_projects_query)
        projects = []
        for (project_id, project_name, project_content, saved_time) in cursor:
            project = {
                "project_id": project_id,
                "project_name": project_name,
                "project_content": project_content,
                "saved_time": saved_time
            }
            projects.append(project)
        cursor.close()
        return projects
    
    def search_projects(self, search_term):
        cursor = self.cnx.cursor()
        search_projects_query = """
        SELECT * FROM Projects
        WHERE project_name LIKE %s OR project_content LIKE %s
        """
        search_data = ('%' + search_term + '%', '%' + search_term + '%')
        cursor.execute(search_projects_query, search_data)
        projects = []
        for (project_id, project_name, project_content, saved_time) in cursor:
            project = {
                "project_id": project_id,
                "project_name": project_name,
                "project_content": project_content,
                "saved_time": saved_time
            }
            projects.append(project)
        cursor.close()
        return projects
    
    def add_project(self, project_name, project_content):
        cursor = self.cnx.cursor()
        add_project_query = """
        INSERT INTO Projects (project_name, project_content)
        VALUES (%s, %s)
        """
        project_data = (project_name, project_content)
        cursor.execute(add_project_query, project_data)
        self.cnx.commit()
        cursor.close()
    
    def delete_project(self, project_id):
            cursor = self.cnx.cursor()
            delete_project_query = "DELETE FROM Projects WHERE project_id = %s"
            cursor.execute(delete_project_query, (project_id,))
            self.cnx.commit()
            cursor.close()
        
    def update_project(self, project_id, project_name, project_content):
        cursor = self.cnx.cursor()
        update_project_query = """
        UPDATE Projects
        SET project_name = %s, project_content = %s
        WHERE project_id = %s
        """
        project_data = (project_name, project_content, project_id)
        cursor.execute(update_project_query, project_data)
        self.cnx.commit()
        cursor.close()

    def export_backup(self, folder_path):
        cursor = self.cnx.cursor()
        export_backup_query = "SELECT * FROM Projects"
        cursor.execute(export_backup_query)
        projects = []
        for (project_id, project_name, project_content, saved_time) in cursor:
            project = {
                "project_id": project_id,
                "project_name": project_name,
                "project_content": project_content,
                "saved_time": saved_time
            }
            projects.append(project)
        cursor.close()

        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        for project in projects:
            project_id = project["project_id"]
            project_name = project["project_name"]
            project_content = project["project_content"]
            saved_time = project["saved_time"]

            backup_folder = os.path.join(folder_path, str(project_id))
            os.makedirs(backup_folder)

            backup_file = os.path.join(backup_folder, f"{project_id}_{project_name}.txt")
            with open(backup_file, "w", encoding="utf-8") as f:
                f.write(f"Project Name: {project_name}\n")
                f.write(f"Saved Time: {saved_time}\n")
                f.write("\n")
                f.write(project_content)

        shutil.make_archive(folder_path, "zip", folder_path)

    def import_backup(self, backup_file_path):
        # 首先解压备份文件
        import_folder = os.path.splitext(backup_file_path)[0]
        shutil.unpack_archive(backup_file_path, import_folder)

        cursor = self.cnx.cursor()
        insert_project_query = """
        INSERT INTO Projects (project_name, project_content)
        VALUES (%s, %s)
        """

        # 遍历解压后的文件夹
        for root, _, files in os.walk(import_folder):
            for file in files:
                project_file = os.path.join(root, file)
                project_name = os.path.splitext(file)[0]

                with open(project_file, "r", encoding="utf-8") as f:
                    project_content = f.read()

                project_data = (project_name, project_content)
                cursor.execute(insert_project_query, project_data)

        self.cnx.commit()
        cursor.close()

""" 
class MemoryDAO:
# 增加一条记忆
    def add_memory(memory, definition='', context='', source='', category=''):
        add_query = ("INSERT INTO memorys "
                    "(memory, definition, context, source, category) "
                    "VALUES (%s, %s, %s, %s, %s)")
        data = (memory, definition, context, source, category)
        cursor.execute(add_query, data)
        cnx.commit()
        return True


    # 根据记忆查询
    def search_by_memory(memory):
        search_query = ("SELECT * FROM memorys "
                        "WHERE memory = %s")
        data = (memory,)
        cursor.execute(search_query, data)
        result = cursor.fetchall()
        return result


    # 根据分类查询
    def search_by_category(category):
        search_query = ("SELECT * FROM memorys "
                        "WHERE category = %s")
        data = (category,)
        cursor.execute(search_query, data)
        result = cursor.fetchall()
        return result


    # 更新一条记忆
    def update_memory(memory_id, memory, definition='', context='', source='', category=''):
        update_query = ("UPDATE memorys "
                        "SET memory=%s, definition=%s, context=%s, source=%s, category=%s "
                        "WHERE id=%s")
        data = (memory, definition, context, source, category, memory_id)
        cursor.execute(update_query, data)
        cnx.commit()
        return True


    # 删除一条记忆
    def delete_memory(memory_id):
        delete_query = ("DELETE FROM memorys "
                        "WHERE id=%s")
        data = (memory_id,)
        cursor.execute(delete_query, data)
        cnx.commit()
        return True


    # 导出备份
    def export_backup_memory(backup_file):
        with open(backup_file, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
        writer.writerow(['id', 'memory', 'definition', 'context', 'source', 'category'])
        search_query = "SELECT * FROM memorys"
        cursor.execute(search_query)
        results = cursor.fetchall()
        for result in results:
            writer.writerow(result)
        print(f"Backup exported to {backup_file}")
        return True

    #  根据条目查找id
    def get_id_by_memory(memory):
        search_query = ("SELECT id FROM memorys "
                        "WHERE memory = %s")
        data = (memory,)
        cursor.execute(search_query, data)
        result = cursor.fetchone()
        if result:
            return result
        else:
            return None
 """
