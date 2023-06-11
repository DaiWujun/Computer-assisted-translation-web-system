import csv

import mysql.connector as connector
from mysql.connector import errorcode

 CREATE TABLE memorys (
    project_id INT AUTO_INCREMENT PRIMARY KEY,        # 项目ID
    project_name VARCHAR(255),                        # 项目名称
    project_content TEXT,                             # 项目内容
    saved_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP    # 保存时间
);

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
