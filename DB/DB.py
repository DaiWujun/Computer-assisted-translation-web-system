import mysql.connector as connector
from mysql.connector import errorcode
import csv

#  CREATE TABLE terms (
#     id INT AUTO_INCREMENT PRIMARY KEY,
#     term VARCHAR(255) NOT NULL,
#     definition TEXT,
#     context TEXT,
#     source VARCHAR(255),
#     category VARCHAR(255),
#     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
# );

# 数据库连接配置
config = {
    'user': 'root',
    'password': 'password',
    'host': 'localhost',
    'database': 'term_db'
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


# 增加一条术语
def add_term(term, definition='', context='', source='', category=''):
    add_query = ("INSERT INTO terms "
                 "(term, definition, context, source, category) "
                 "VALUES (%s, %s, %s, %s, %s)")
    data = (term, definition, context, source, category)
    cursor.execute(add_query, data)
    cnx.commit()


# 根据术语查询
def search_by_term(term):
    search_query = ("SELECT * FROM terms "
                    "WHERE term = %s")
    data = (term,)
    cursor.execute(search_query, data)
    result = cursor.fetchall()
    return result


# 根据分类查询
def search_by_category(category):
    search_query = ("SELECT * FROM terms "
                    "WHERE category = %s")
    data = (category,)
    cursor.execute(search_query, data)
    result = cursor.fetchall()
    return result


# 更新一条术语
def update_term(term_id, term, definition='', context='', source='', category=''):
    update_query = ("UPDATE terms "
                    "SET term=%s, definition=%s, context=%s, source=%s, category=%s "
                    "WHERE id=%s")
    data = (term, definition, context, source, category, term_id)
    cursor.execute(update_query, data)
    cnx.commit()


# 删除一条术语
def delete_term(term_id):
    delete_query = ("DELETE FROM terms "
                    "WHERE id=%s")
    data = (term_id,)
    cursor.execute(delete_query, data)
    cnx.commit()


# 导出备份
def export_backup(backup_file):
    with open(backup_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
    writer.writerow(['id', 'term', 'definition', 'context', 'source', 'category'])
    search_query = "SELECT * FROM terms"
    cursor.execute(search_query)
    results = cursor.fetchall()
    for result in results:
        writer.writerow(result)
    print(f"Backup exported to {backup_file}")

def get_id_by_term(term):
    search_query = ("SELECT id FROM terms "
                    "WHERE term = %s")
    data = (term,)
    cursor.execute(search_query, data)
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        return None
