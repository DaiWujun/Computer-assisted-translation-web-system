import csv

import mysql.connector as connector
from mysql.connector import errorcode

#  CREATE TABLE terms (
#     id INT AUTO_INCREMENT PRIMARY KEY,                                            #   术语的唯一标识符，自动递增；
#     term VARCHAR(255) NOT NULL,                                                   #   术语本身，必填字段；
#     definition TEXT,                                                              #   术语的定义，可选字段；
#     context TEXT,                                                                 #   术语出现的上下文，可选字段；
#     source VARCHAR(255),                                                          #   术语来源，可选字段；
#     category VARCHAR(255),                                                        #   术语所属的分类，可选字段；
#     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,                               #   术语的创建时间，自动生成；
#     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP    #   术语的更新时间，自动更新。
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

class TermDAO:
    # 增加一条术语
    def add_term(term, definition='', context='', source='', category=''):
        add_query = ("INSERT INTO terms "
                    "(term, definition, context, source, category) "
                    "VALUES (%s, %s, %s, %s, %s)")
        data = (term, definition, context, source, category)
        cursor.execute(add_query, data)
        cnx.commit()
        return True

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
        return True

    # 删除一条术语
    def delete_term(term_id):
        delete_query = ("DELETE FROM terms "
                        "WHERE id=%s")
        data = (term_id,)
        cursor.execute(delete_query, data)
        cnx.commit()
        return True

    # 导出备份
    def export_backup_term(backup_file):
        with open(backup_file, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
        writer.writerow(['id', 'term', 'definition', 'context', 'source', 'category'])
        search_query = "SELECT * FROM terms"
        cursor.execute(search_query)
        results = cursor.fetchall()
        for result in results:
            writer.writerow(result)
        print(f"Backup exported to {backup_file}")
        return True

    #  根据条目查找id
    def get_id_by_term(term):
        search_query = ("SELECT id FROM terms "
                        "WHERE term = %s")
        data = (term,)
        cursor.execute(search_query, data)
        result = cursor.fetchone()
        if result:
            return result
        else:
            return None
