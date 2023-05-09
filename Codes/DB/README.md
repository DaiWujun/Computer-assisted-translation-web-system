# Database

该文件夹存放关于项目数据库相关的代码文件

## MemoryLibrary

### memorys

```mysql
id INT AUTO_INCREMENT PRIMARY KEY,                                            
#   记忆的唯一标识符，自动递增；
memory VARCHAR(255) NOT NULL,                                                 
#   记忆本身，必填字段；
definition TEXT,                                                              
#   记忆的定义，可选字段；
context TEXT,                                                                 
#   记忆出现的上下文，可选字段；
source VARCHAR(255),                                                          
#   记忆来源，可选字段；
category VARCHAR(255),                                                        
#   记忆所属的分类，可选字段；
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,                               
#   记忆的创建时间，自动生成；
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP    
#   记忆的更新时间，自动更新。
```

### 增加一条记忆

```python
def add_memory(memory, definition='', context='', source='', category=''):
    add_query = ("INSERT INTO memorys "
                 "(memory, definition, context, source, category) "
                 "VALUES (%s, %s, %s, %s, %s)")
    data = (memory, definition, context, source, category)
    cursor.execute(add_query, data)
    cnx.commit()
    return True
```

函数名称：add_memory

函数功能：将一条记忆添加到数据库中。如果添加成功，返回True；

输入参数：

- memory：字符串，要添加的记忆。
- definition：字符串，记忆的定义（可选，默认为空字符串）。
- context：字符串，记忆的上下文（可选，默认为空字符串）。
- source：字符串，记忆的来源（可选，默认为空字符串）。
- category：字符串，记忆的分类（可选，默认为空字符串）。

输出参数：

- True：如果更新成功
- False：如果更新失败

### 根据记忆查询

```python
def search_by_memory(memory):
    search_query = ("SELECT * FROM memorys "
                    "WHERE memory = %s")
    data = (memory,)
    cursor.execute(search_query, data)
    result = cursor.fetchall()
    return result
```

函数名称：search_by_memory

函数功能：根据记忆查询数据库中的记录

输入参数：

- memory: 记忆，字符串类型

输出参数：

- result：数据库中匹配到的记录，元组类型

### 根据分类查询

```python
def search_by_category(category):
    search_query = ("SELECT * FROM memorys "
                    "WHERE category = %s")
    data = (category,)
    cursor.execute(search_query, data)
    result = cursor.fetchall()
    return result
```

函数名：search_by_category

功能：根据category查找memorys表中符合条件的所有记录。

输入参数：

- category: 要查找的category。

输出参数：

- result: 符合条件的所有记录。返回一个二维元组，每个元素代表一条记录。如果没有符合条件的记录，则返回一个空元组。

注意事项：

- category是memorys表中的一个字段，如果表中不存在该字段，查询也会出错。
- 在进行查询前，要保证数据库连接已经建立。

### 更新一条记忆

```python
def update_memory(memory_id, memory, definition='', context='', source='', category=''):
    update_query = ("UPDATE memorys "
                    "SET memory=%s, definition=%s, context=%s, source=%s, category=%s "
                    "WHERE id=%s")
    data = (memory, definition, context, source, category, memory_id)
    cursor.execute(update_query, data)
    cnx.commit()
    return True
```

函数名称：update_memory

功能：根据memory_id更新一条记忆条目的信息

输入参数：

- memory_id: 记忆条目的唯一标识符
- memory: 记忆内容
- definition: 记忆内容的定义（可选）
- context: 记忆内容的上下文（可选）
- source: 记忆内容来源（可选）
- category: 记忆内容的分类（可选）

输出参数：

- True：如果更新成功
- False：如果更新失败

函数实现：

- 根据传入的memory_id，memory，definition，context，source，category参数构造一个SQL UPDATE语句，更新对应的记忆条目。
- 执行SQL UPDATE语句，将更新后的信息存入数据库。
- 如果执行成功，返回True；如果执行失败，返回False。

### 删除一条记忆

```python
def delete_memory(memory_id):
    delete_query = ("DELETE FROM memorys "
                    "WHERE id=%s")
    data = (memory_id,)
    cursor.execute(delete_query, data)
    cnx.commit()
    return True
```

函数名称：delete_memory

功能：根据传入的memory_id，删除对应的memory记录。

输入参数：

- memory_id: int类型，表示要删除的memory记录的id。

输出参数

- True：如果删除成功
- False：如果删除失败

### 导出备份

```Python
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

```

函数名称：export_backup_memory

函数功能： 该函数实现将所有记忆库数据导出到指定的备份文件中。首先，函数使用 csv 模块创建一个 csv.writer 对象，指定文件名、换行符和编码方式。接下来，函数查询所有的记忆库数据，将查询结果逐行写入备份文件中，最后在控制台输出备份文件的路径。

输入参数：

- backup_file：字符串类型，表示备份文件的路径。

输出参数：

- 如果备份文件导出成功，返回 True；否则返回 False。

注意事项：

- 备份文件的路径必须是字符串类型。
- 备份文件的路径必须是有效的路径，否则函数会报错。
- 备份文件的路径必须指定文件名和后缀名，后缀名应为 .csv。
- 备份文件的路径中的文件夹必须存在，否则函数会报错。
- 如果备份文件已经存在，函数会覆盖该文件。
- 如果查询结果为空，则备份文件中不会写入任何数据。

### 根据条目查找id

```python
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
```

函数名：get_id_by_memory

函数功能：查询给定记忆文本在数据库中的ID，以便其他函数能够使用这个ID来进行相关操作。

输入参数：

- memory: 要查询的记忆文本

输出参数：

- 如果找到了匹配的记忆文本，则返回其对应的ID；否则返回None。




## TermLibrary

### terms

```mysql
id INT AUTO_INCREMENT PRIMARY KEY,                                            
#   术语的唯一标识符，自动递增；
term VARCHAR(255) NOT NULL,                                                   
#   术语本身，必填字段；
definition TEXT,                                                              
#   术语的定义，可选字段；
context TEXT,                                                                 
#   术语出现的上下文，可选字段；
source VARCHAR(255),                                                          
#   术语来源，可选字段；
category VARCHAR(255),                                                        
#   术语所属的分类，可选字段；
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,                               
#   术语的创建时间，自动生成；
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP    
#   术语的更新时间，自动更新。
```

### 增加一条术语

```python
def add_term(term, definition='', context='', source='', category=''):
    add_query = ("INSERT INTO terms "
                 "(term, definition, context, source, category) "
                 "VALUES (%s, %s, %s, %s, %s)")
    data = (term, definition, context, source, category)
    cursor.execute(add_query, data)
    cnx.commit()
    return True
```

函数名称：add_term

函数功能：将一条术语添加到数据库中。如果添加成功，返回True；

输入参数：

- term：字符串，要添加的术语。
- definition：字符串，术语的定义（可选，默认为空字符串）。
- context：字符串，术语的上下文（可选，默认为空字符串）。
- source：字符串，术语的来源（可选，默认为空字符串）。
- category：字符串，术语的分类（可选，默认为空字符串）。

输出参数：

- True：如果更新成功
- False：如果更新失败

### 根据术语查询

```python
def search_by_term(term):
    search_query = ("SELECT * FROM terms "
                    "WHERE term = %s")
    data = (term,)
    cursor.execute(search_query, data)
    result = cursor.fetchall()
    return result
```

函数名称：search_by_term

函数功能：根据术语查询数据库中的记录

输入参数：

- term: 术语，字符串类型

输出参数：

- result：数据库中匹配到的记录，元组类型

### 根据分类查询

```python
def search_by_category(category):
    search_query = ("SELECT * FROM terms "
                    "WHERE category = %s")
    data = (category,)
    cursor.execute(search_query, data)
    result = cursor.fetchall()
    return result
```

函数名：search_by_category

功能：根据category查找terms表中符合条件的所有记录。

输入参数：

- category: 要查找的category。

输出参数：

- result: 符合条件的所有记录。返回一个二维元组，每个元素代表一条记录。如果没有符合条件的记录，则返回一个空元组。

注意事项：

- category是terms表中的一个字段，如果表中不存在该字段，查询也会出错。
- 在进行查询前，要保证数据库连接已经建立。

### 更新一条术语

```python
def update_term(term_id, term, definition='', context='', source='', category=''):
    update_query = ("UPDATE terms "
                    "SET term=%s, definition=%s, context=%s, source=%s, category=%s "
                    "WHERE id=%s")
    data = (term, definition, context, source, category, term_id)
    cursor.execute(update_query, data)
    cnx.commit()
    return True
```

函数名称：update_term

功能：根据term_id更新一条术语条目的信息

输入参数：

- term_id: 术语条目的唯一标识符
- term: 术语内容
- definition: 术语内容的定义（可选）
- context: 术语内容的上下文（可选）
- source: 术语内容来源（可选）
- category: 术语内容的分类（可选）

输出参数：

- True：如果更新成功
- False：如果更新失败

函数实现：

- 根据传入的term_id，term，definition，context，source，category参数构造一个SQL UPDATE语句，更新对应的术语条目。
- 执行SQL UPDATE语句，将更新后的信息存入数据库。
- 如果执行成功，返回True；如果执行失败，返回False。

### 删除一条术语

```python
def delete_term(term_id):
    delete_query = ("DELETE FROM terms "
                    "WHERE id=%s")
    data = (term_id,)
    cursor.execute(delete_query, data)
    cnx.commit()
    return True
```

函数名称：delete_term

功能：根据传入的term_id，删除对应的term记录。

输入参数：

- term_id: int类型，表示要删除的term记录的id。

输出参数

- True：如果删除成功
- False：如果删除失败

### 导出备份

```Python
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
```

函数名称：export_backup_term

函数功能： 该函数实现将所有术语库数据导出到指定的备份文件中。首先，函数使用 csv 模块创建一个 csv.writer 对象，指定文件名、换行符和编码方式。接下来，函数查询所有的术语库数据，将查询结果逐行写入备份文件中，最后在控制台输出备份文件的路径。

输入参数：

- backup_file：字符串类型，表示备份文件的路径。

输出参数：

- 如果备份文件导出成功，返回 True；否则返回 False。

注意事项：

- 备份文件的路径必须是字符串类型。
- 备份文件的路径必须是有效的路径，否则函数会报错。
- 备份文件的路径必须指定文件名和后缀名，后缀名应为 .csv。
- 备份文件的路径中的文件夹必须存在，否则函数会报错。
- 如果备份文件已经存在，函数会覆盖该文件。
- 如果查询结果为空，则备份文件中不会写入任何数据。

### 根据条目查找id

```python
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
```

函数名：get_id_by_term

函数功能：查询给定术语文本在数据库中的ID，以便其他函数能够使用这个ID来进行相关操作。

输入参数：

- term: 要查询的术语文本

输出参数：

- 如果找到了匹配的术语文本，则返回其对应的ID；否则返回None。
