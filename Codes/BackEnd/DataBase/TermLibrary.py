import csv

import mysql.connector as connector
from mysql.connector import errorcode

 CREATE TABLE terms (
    id INT AUTO_INCREMENT PRIMARY KEY,                                            #   术语的唯一标识符，自动递增；
    term VARCHAR(255) NOT NULL,                                                   #   术语本身，必填字段；
    definition TEXT,                                                              #   术语的定义，可选字段；
    context TEXT,                                                                 #   术语出现的上下文，可选字段；
    source VARCHAR(255),                                                          #   术语来源，可选字段；
    category VARCHAR(255),                                                        #   术语所属的分类，可选字段；
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,                               #   术语的创建时间，自动生成；
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP    #   术语的更新时间，自动更新。
);

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
