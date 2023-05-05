import mysql.connector as connector
from mysql.connector import errorcode
import csv

#  CREATE TABLE memorys (
#     id INT AUTO_INCREMENT PRIMARY KEY,                                            #   记忆的唯一标识符，自动递增；
#     memory VARCHAR(255) NOT NULL,                                                 #   记忆本身，必填字段；
#     definition TEXT,                                                              #   记忆的定义，可选字段；
#     context TEXT,                                                                 #   记忆出现的上下文，可选字段；
#     source VARCHAR(255),                                                          #   记忆来源，可选字段；
#     category VARCHAR(255),                                                        #   记忆所属的分类，可选字段；
#     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,                               #   记忆的创建时间，自动生成；
#     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP    #   记忆的更新时间，自动更新。
# );

# 数据库连接配置
config = {
    'user': 'root',
    'password': 'password',
    'host': 'localhost',
    'database': 'memory_db'
}

# 连接数据库
try:
    cnx = connector.connect(**config)
    print("Connected to database!")
except connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your username or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)

# 获取游标
cursor = cnx.cursor()


# 增加一条记忆
def add_memory(memory, definition='', context='', source='', category=''):
    add_query = ("INSERT INTO memorys "
                 "(memory, definition, context, source, category) "
                 "VALUES (%s, %s, %s, %s, %s)")
    data = (memory, definition, context, source, category)
    cursor.execute(add_query, data)
    cnx.commit()


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


# 删除一条记忆
def delete_memory(memory_id):
    delete_query = ("DELETE FROM memorys "
                    "WHERE id=%s")
    data = (memory_id,)
    cursor.execute(delete_query, data)
    cnx.commit()


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

def get_id_by_memory(memory):
    search_query = ("SELECT id FROM memorys "
                    "WHERE memory = %s")
    data = (memory,)
    cursor.execute(search_query, data)
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        return None
